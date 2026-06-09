<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onUnmounted, nextTick } from "vue";
import "maplibre-gl/dist/maplibre-gl.css";

const props = defineProps<{
  activeIndex: number;
  isSecretActive: boolean;
}>();

const coordinates: [number, number][] = [
  [110.4457, -7.5407],
  [110.36706, -7.782884],
  [110.3642031, -7.8052845],
  [110.3633, -7.8252],
  [110.332, -8.0244],
];

const pinImages = [
  "/images/wisata/merapi.jpg",
  "/images/sejarah/tugu.jpg",
  "/images/sejarah/keraton.jpg",
  "/images/wisata/krapyak.jpg",
  "/images/home/parangtritis.jpg",
];

const mapContainer = ref<HTMLElement | null>(null);
const map = shallowRef<any>(null);
const markerElements = ref<HTMLElement[]>([]);
let animationFrame: number;
let orbitReq: number;
let orbitTimeout: ReturnType<typeof setTimeout> | null = null;

const updateMarkers = (index: number) => {
  markerElements.value.forEach((el, i) => {
    el.classList.remove(
      "opacity-100",
      "scale-100",
      "scale-125",
      "opacity-40",
      "scale-75",
      "grayscale",
      "shadow-2xl",
    );

    if (index === -1) {
      el.classList.add("opacity-100", "scale-100");
      if (el.parentElement) el.parentElement.style.zIndex = "10";
    } else if (index === i) {
      el.classList.add("opacity-100", "scale-125", "shadow-2xl");
      if (el.parentElement) el.parentElement.style.zIndex = "50";
    } else {
      el.classList.add("opacity-40", "scale-75", "grayscale");
      if (el.parentElement) el.parentElement.style.zIndex = "0";
    }
  });
};

const orbitMap = () => {
  if (map.value) {
    map.value.setBearing(map.value.getBearing() + 0.1);
  }
  orbitReq = requestAnimationFrame(orbitMap);
};

const flyToLocation = (index: number) => {
  if (!map.value) return;
  if (index === -1) {
    map.value.flyTo({
      center: [110.38, -7.78],
      zoom: 10,
      pitch: 45,
      bearing: 0,
      duration: 2000,
      curve: 1,
      essential: true,
    });
    return;
  }
  map.value.flyTo({
    center: coordinates[index],
    zoom: index === 4 ? 11.5 : 14,
    pitch: 50,
    bearing: index * 10 - 15,
    duration: 2000,
    curve: 1,
    essential: true,
  });
};

const drawPath = (newIndex: number, oldIndex: number) => {
  if (!map.value || !map.value.getSource("route-active")) return;

  if (animationFrame) cancelAnimationFrame(animationFrame);

  if (newIndex <= 0) {
    map.value.getSource("route-active").setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: [] },
    });
    return;
  }

  const effectiveOldIndex = oldIndex <= 0 ? 0 : oldIndex;

  if (Math.abs(newIndex - effectiveOldIndex) > 1) {
    map.value.getSource("route-active").setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates.slice(0, newIndex + 1),
      },
    });
    return;
  }

  const isForward = newIndex > effectiveOldIndex;
  const baseCoords = coordinates.slice(0, isForward ? newIndex : newIndex + 1);
  const startCoord = coordinates[effectiveOldIndex];
  const endCoord = coordinates[newIndex];

  if (!startCoord || !endCoord) return;

  let startTime: number | null = null;
  const duration = 1800;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    const currentLon =
      startCoord[0] + (endCoord[0] - startCoord[0]) * easeProgress;
    const currentLat =
      startCoord[1] + (endCoord[1] - startCoord[1]) * easeProgress;

    const animatedCoords = [...baseCoords, [currentLon, currentLat]];

    map.value.getSource("route-active").setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: animatedCoords,
      },
    });

    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    } else {
      map.value.getSource("route-active").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates.slice(0, newIndex + 1),
        },
      });
    }
  };

  animationFrame = requestAnimationFrame(step);
};

watch(
  () => props.activeIndex,
  (newIndex, oldIndex) => {
    if (orbitReq) cancelAnimationFrame(orbitReq);
    if (orbitTimeout) clearTimeout(orbitTimeout);

    flyToLocation(newIndex);
    updateMarkers(newIndex);
    drawPath(newIndex, oldIndex ?? -1);

    orbitTimeout = setTimeout(() => {
      orbitReq = requestAnimationFrame(orbitMap);
    }, 5000);
  },
);

onMounted(async () => {
  await nextTick();
  if (!mapContainer.value) return;

  const maplibreModule = await import("maplibre-gl");
  const maplibregl = maplibreModule.default || maplibreModule;

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    fadeDuration: 0,
    style: {
      version: 8,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: [
            "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [110.38, -7.78],
    zoom: 10,
    pitch: 45,
    bearing: 0,
    interactive: false,
    dragPan: false,
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    maxBounds: [
      [109.5, -8.5],
      [111.5, -7.0],
    ],
  });

  map.value.once("load", () => {
    if (!map.value) return;

    map.value.addSource("route-base", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    });

    map.value.addLayer({
      id: "route-base-line",
      type: "line",
      source: "route-base",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#b8491f",
        "line-width": 4,
        "line-dasharray": [2, 2],
        "line-opacity": 0.2,
      },
    });

    map.value.addSource("route-active", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates:
            props.activeIndex > 0
              ? coordinates.slice(0, props.activeIndex + 1)
              : [],
        },
      },
    });

    map.value.addLayer({
      id: "route-active-line",
      type: "line",
      source: "route-active",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#b8491f",
        "line-width": 4,
        "line-dasharray": [2, 2],
        "line-opacity": 1,
      },
    });

    coordinates.forEach((coord, i) => {
      const wrapper = document.createElement("div");
      wrapper.className =
        "relative transition-all duration-500 transform-gpu will-change-transform";
      wrapper.style.zIndex = "10";

      const el = document.createElement("div");
      el.className =
        "w-12 h-12 bg-[#faf7f2] rounded-full border-[3px] border-[#b8491f] shadow-xl flex items-center justify-center overflow-hidden transition-all duration-500 origin-center transform-gpu will-change-transform";
      el.innerHTML = `<img src="${pinImages[i]}" alt="pin" class="w-full h-full object-cover" onerror="this.src='/images/placeholder.jpg'" />`;

      wrapper.appendChild(el);
      markerElements.value.push(el);

      new maplibregl.Marker({ element: wrapper })
        .setLngLat(coord)
        .addTo(map.value);
    });

    updateMarkers(props.activeIndex);

    orbitTimeout = setTimeout(() => {
      orbitReq = requestAnimationFrame(orbitMap);
    }, 5000);
  });
});

onUnmounted(() => {
  if (map.value) map.value.remove();
  if (animationFrame) cancelAnimationFrame(animationFrame);
  if (orbitReq) cancelAnimationFrame(orbitReq);
  if (orbitTimeout) clearTimeout(orbitTimeout);
});
</script>

<template>
  <div class="fixed inset-0 w-full h-full z-0 bg-[#1a1208] transform-gpu">
    <ClientOnly>
      <div
        ref="mapContainer"
        class="absolute inset-0 w-full h-full map-filter transform-gpu transition-all duration-1000"
        :class="{ 'secret-active': props.isSecretActive }"
      ></div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.map-filter {
  filter: sepia(0.5) contrast(1.1) brightness(0.7);
}
.map-filter.secret-active {
  filter: sepia(0.2) contrast(1.3) brightness(0.3) saturate(1.5);
}
</style>
