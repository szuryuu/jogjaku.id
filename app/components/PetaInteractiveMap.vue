<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useI18n, navigateTo } from "#imports";

const props = defineProps<{
  mode: "poi" | "internet";
  category: "all" | "wisata" | "kuliner" | "budaya" | "teknologi";
  highlightedTier: string | null;
  resetViewSignal: number;
}>();

const { locale } = useI18n();

const mapContainer = ref<HTMLElement | null>(null);
const pois = ref<any[]>([]);
const regionStatsMap = ref<Record<string, any>>({});

let mapInstance: any = null;
let markersGroup: any = null;
let axisLayer: any = null;
let diyBoundaryLayer: any = null;
let regionsLayer: any = null;
let internetCircles: any[] = [];
let regionLabels: any[] = [];
let L: any = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const activeRegion = ref<string | null>(null);
const hoveredRegion = ref<string | null>(null);

const DEFAULT_CENTER: [number, number] = [-7.7956, 110.3695];
const DEFAULT_ZOOM = 10;

const updateRegionStyles = () => {
  if (!regionsLayer) return;

  regionsLayer.eachLayer((layer: any) => {
    const id = layer.feature.properties.id;
    const isActive = activeRegion.value === id;
    const isHovered = hoveredRegion.value === id;
    const stats = regionStatsMap.value[id];

    if (!stats) return;

    let baseColor = "#c84b31";
    let weight = 0;
    let opac = 0;
    let fillOpac = 0;

    if (props.mode === "poi") {
      baseColor = "#c84b31";
      weight = isActive ? 2 : isHovered ? 1 : 0;
      opac = isActive ? 0.8 : isHovered ? 0.5 : 0;
      fillOpac = isActive ? 0.25 : isHovered ? 0.1 : 0.0;
    } else {
      baseColor =
        stats.tier === "high"
          ? "#1a1208"
          : stats.tier === "mid"
            ? "#c84b31"
            : "#a38b72";

      const isDimmed =
        props.highlightedTier && stats.tier !== props.highlightedTier;

      weight = isActive || isHovered ? 2 : 1;
      opac = isDimmed ? 0.1 : isActive || isHovered ? 1 : 0.6;
      fillOpac = isDimmed ? 0.05 : isActive ? 0.35 : isHovered ? 0.25 : 0.15;
    }

    layer.setStyle({
      color: baseColor,
      weight,
      opacity: opac,
      fillColor: baseColor,
      fillOpacity: fillOpac,
      className: "region-polygon",
    });

    const tooltip = layer.getTooltip();
    if (tooltip && tooltip._container) {
      tooltip._container.classList.toggle("active", isActive || isHovered);
      tooltip._container.classList.toggle("inactive", !(isActive || isHovered));
    }
  });
};

const resetDebounce = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    activeRegion.value = null;
    updateRegionStyles();
  }, 60000);
};

const getAdjustedPoiCoords = (loc: any, index: number): [number, number] => {
  if (loc.regionId !== "kota") return loc.coords;

  const spreadPattern: Array<[number, number]> = [
    [0.008, -0.008],
    [0.01, 0],
    [0.008, 0.008],
    [0, 0.01],
    [-0.008, 0.008],
    [-0.01, 0],
    [-0.008, -0.008],
    [0, -0.01],
  ];

  const patternIndex = index % spreadPattern.length;
  const [latOffset, lngOffset] = spreadPattern[patternIndex] ?? [0, 0];
  return [loc.coords[0] + latOffset, loc.coords[1] + lngOffset];
};

const renderMarkers = () => {
  if (!markersGroup || !L) return;

  markersGroup.clearLayers();

  const filtered = pois.value.filter((loc) => {
    const catMatch =
      props.category === "all" || loc.category === props.category;
    const regMatch = !activeRegion.value || loc.regionId === activeRegion.value;
    return catMatch && regMatch;
  });

  filtered.forEach((loc, index) => {
    const customIcon = L.divIcon({
      className: "custom-div-icon",
      html: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#c84b31" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="#faf7f2" stroke-width="1"/></svg>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const popupContent = `<div class="w-64 rounded-xl bg-warm-white overflow-hidden shadow-2xl border border-line"><img src="${loc.image}" class="h-32 w-full object-cover grayscale" /><div class="p-4"><div class="text-[9px] uppercase tracking-widest text-terra font-bold mb-1">${loc.category}</div><h4 class="text-ink font-libre font-bold text-[16px] mb-2">${locale.value === "en" ? loc.name.en : loc.name.id}</h4><a href="/${loc.category}" data-nuxt-link="true" class="block w-full bg-ink text-warm-white py-2 font-josefin text-[10px] text-center uppercase tracking-widest hover:bg-terra transition-colors decoration-none cursor-pointer">${locale.value === "en" ? "Explore Details" : "Lihat Detail"}</a></div></div>`;

    const markerCoords = getAdjustedPoiCoords(loc, index);

    markersGroup.addLayer(
      L.marker(markerCoords, { icon: customIcon }).bindPopup(popupContent, {
        closeButton: false,
        className: "immersive-popup",
        offset: [0, -30],
      }),
    );
  });
};

const handleMapClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const link = target.closest("a[data-nuxt-link='true']");
  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href) navigateTo(href);
  }
};

onMounted(async () => {
  if (!import.meta.client) return;

  const mapData = await $fetch<any>("/api/data/map");
  pois.value = mapData.pois;
  regionStatsMap.value = mapData.regionStats;
  const { diyBoundary, diyRegionsGeoJSON, philosophicalAxis } = mapData;

  const leafletModule = await import("leaflet");
  L = leafletModule.default || leafletModule;

  await import("leaflet.markercluster");
  await import("leaflet/dist/leaflet.css");
  await import("leaflet.markercluster/dist/MarkerCluster.css");
  await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

  mapInstance = L.map(mapContainer.value!).setView(
    DEFAULT_CENTER,
    DEFAULT_ZOOM,
  );

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution: "&copy; CARTO",
    },
  ).addTo(mapInstance);

  diyBoundaryLayer = L.geoJSON(diyBoundary, {
    style: {
      color: "#c84b31",
      weight: 2,
      opacity: 0.3,
      fillColor: "#c84b31",
      fillOpacity: 0.05,
    },
    interactive: false,
  }).addTo(mapInstance);

  regionsLayer = L.geoJSON(diyRegionsGeoJSON as any, {
    onEachFeature: (feature: any, layer: any) => {
      const name = feature.properties.name
        .replace("Kabupaten ", "")
        .replace("Kota ", "");

      layer.bindTooltip(name, {
        permanent: true,
        direction: "center",
        className: "region-polygon-label inactive",
      });

      layer.on({
        mouseover: () => {
          hoveredRegion.value = feature.properties.id;
          updateRegionStyles();
        },
        mouseout: () => {
          hoveredRegion.value = null;
          updateRegionStyles();
        },
        click: () => {
          if (activeRegion.value === feature.properties.id) {
            activeRegion.value = null;
            if (debounceTimer) clearTimeout(debounceTimer);
          } else {
            activeRegion.value = feature.properties.id;
            resetDebounce();
          }
          updateRegionStyles();
        },
      });
    },
  });

  axisLayer = L.polyline(philosophicalAxis, {
    color: "#c84b31",
    weight: 2,
    opacity: 0.5,
    dashArray: "10, 10",
    interactive: false,
  });

  markersGroup = (L as any).markerClusterGroup({
    showCoverageOnHover: false,
    iconCreateFunction: (cluster: any) =>
      L.divIcon({
        html: `<div class="bg-ink text-warm-white w-10 h-10 rounded-full flex items-center justify-center font-josefin text-[12px] border-2 border-terra shadow-xl">${cluster.getChildCount()}</div>`,
        className: "custom-cluster-icon",
        iconSize: [40, 40],
      }),
  });

  Object.entries(regionStatsMap.value).forEach(([id, data]: [string, any]) => {
    const color =
      data.tier === "high"
        ? "#1a1208"
        : data.tier === "mid"
          ? "#c84b31"
          : "#a38b72";
    const beaconSize = data.penetration * 2.5;
    const duration = data.tier === "high" ? 1.5 : data.tier === "mid" ? 2 : 2.5;

    const iconHTML = `
      <div class="relative flex items-center justify-center w-full h-full">
        <div class="absolute rounded-full z-10" style="width: 14px; height: 14px; background-color: ${color}; box-shadow: 0 0 10px ${color}80;"></div>
        <div class="absolute rounded-full beacon-wave" style="border-color: ${color}; animation-duration: ${duration}s; --max-size: ${beaconSize}px;"></div>
        <div class="absolute rounded-full beacon-wave" style="border-color: ${color}; animation-duration: ${duration}s; animation-delay: ${duration / 2}s; --max-size: ${beaconSize}px;"></div>
      </div>
    `;

    const icon = L.divIcon({
      className: "internet-beacon-wrapper",
      html: iconHTML,
      iconSize: [beaconSize, beaconSize],
      iconAnchor: [beaconSize / 2, beaconSize / 2],
    });

    const marker = L.marker(data.coords as [number, number], { icon });

    marker.bindTooltip(
      `<div class="font-lato bg-ink text-warm-white p-3 rounded-lg shadow-xl"><div class="text-[10px] uppercase text-terra mb-1">${data.name}</div><div class="text-[20px] font-bold">${data.penetration}%</div></div>`,
      { direction: "top", className: "internet-tooltip", opacity: 1 },
    );

    marker.tier = data.tier;
    internetCircles.push(marker);

    const regionName = data.name.replace("Kabupaten ", "").replace("Kota ", "");
    const labelIcon = L.divIcon({
      className: "region-label",
      html: `<div style="color: #1a1208; font-family: 'Josefin Sans', sans-serif; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.25em; text-shadow: 2px 2px 0px #faf7f2, -2px -2px 0px #faf7f2, 2px -2px 0px #faf7f2, -2px 2px 0px #faf7f2; opacity: 0.6;">${regionName}</div>`,
      iconSize: [140, 20],
      iconAnchor: [70, 10],
    });

    regionLabels.push(
      L.marker(data.coords, { icon: labelIcon, interactive: false }),
    );
  });

  if (props.mode === "poi") {
    regionsLayer.addTo(mapInstance);
    axisLayer.addTo(mapInstance);
    mapInstance.addLayer(markersGroup);
    renderMarkers();
    updateRegionStyles();
  } else {
    regionsLayer.addTo(mapInstance);
    internetCircles.forEach((c) => c.addTo(mapInstance));
    regionLabels.forEach((l) => l.addTo(mapInstance));
    updateRegionStyles();
  }

  if (mapContainer.value) {
    mapContainer.value.addEventListener("click", handleMapClick);
  }
});

watch([() => props.category, activeRegion], () => {
  if (props.mode === "poi") renderMarkers();
});

watch(
  () => props.mode,
  (mode) => {
    if (!mapInstance) return;

    const mapEl = mapInstance.getContainer?.();
    if (mapEl) {
      mapEl.classList.toggle("internet-mode", mode === "internet");
    }

    if (mode === "poi") {
      internetCircles.forEach((c) => mapInstance.removeLayer(c));
      regionLabels.forEach((l) => mapInstance.removeLayer(l));
      mapInstance.addLayer(regionsLayer);
      mapInstance.addLayer(axisLayer);
      mapInstance.addLayer(markersGroup);
      renderMarkers();
    } else {
      mapInstance.removeLayer(markersGroup);
      mapInstance.removeLayer(axisLayer);
      mapInstance.addLayer(regionsLayer);
      internetCircles.forEach((c) => c.addTo(mapInstance));
      regionLabels.forEach((l) => l.addTo(mapInstance));
    }
    updateRegionStyles();
  },
);

watch(
  () => props.highlightedTier,
  (tier) => {
    if (props.mode !== "internet") return;

    updateRegionStyles();

    internetCircles.forEach((marker) => {
      const el = marker.getElement();
      if (!el) return;

      if (!tier || marker.tier === tier) {
        el.style.opacity = "1";
        el.style.filter = tier ? "drop-shadow(0 0 10px currentColor)" : "none";
      } else {
        el.style.opacity = "0.15";
        el.style.filter = "none";
      }
    });
  },
);

watch(
  () => props.resetViewSignal,
  () => {
    if (!mapInstance) return;

    activeRegion.value = null;
    hoveredRegion.value = null;

    mapInstance.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, {
      duration: 0.6,
      easeLinearity: 0.25,
    });

    updateRegionStyles();
  },
);

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
  if (mapContainer.value) {
    mapContainer.value.removeEventListener("click", handleMapClick);
  }
});
</script>

<template>
  <div ref="mapContainer" class="absolute inset-0 z-0 map-sepia"></div>
</template>

<style>
.map-sepia .leaflet-tile-pane {
  filter: sepia(0.3) contrast(0.95) brightness(1.02);
}
.immersive-popup .leaflet-popup-content-wrapper {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}
.immersive-popup .leaflet-popup-tip-container {
  display: none;
}
.immersive-popup .leaflet-popup-content {
  margin: 0 !important;
  width: auto !important;
}
.custom-div-icon {
  background: transparent !important;
  border: none !important;
}
.internet-tooltip {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.internet-tooltip::before {
  display: none !important;
}
.leaflet-container {
  background: #faf7f2 !important;
}
.region-label {
  pointer-events: none;
}
.region-polygon {
  transition:
    fill-opacity 0.3s ease,
    opacity 0.3s ease,
    stroke-width 0.3s ease;
  outline: none;
}
.region-polygon-label {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: #1a1208;
  font-family: "Josefin Sans", sans-serif;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  text-shadow:
    2px 2px 0px #faf7f2,
    -2px -2px 0px #faf7f2,
    2px -2px 0px #faf7f2,
    -2px 2px 0px #faf7f2;
  transition:
    opacity 0.3s ease,
    font-size 0.3s ease;
  pointer-events: none;
}
.region-polygon-label::before {
  display: none !important;
}
.leaflet-container.internet-mode .region-polygon-label {
  display: none !important;
}
.region-polygon-label.inactive {
  opacity: 0.3;
}
.region-polygon-label.active {
  opacity: 1;
  font-size: 14px;
  z-index: 1000 !important;
}
.internet-beacon-wrapper {
  background: transparent !important;
  border: none !important;
  transition:
    opacity 0.4s ease,
    filter 0.4s ease;
}
.beacon-wave {
  border-width: 2px;
  border-style: solid;
  animation-name: radar-pulse;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-iteration-count: infinite;
}
@keyframes radar-pulse {
  0% {
    width: 14px;
    height: 14px;
    opacity: 0.8;
    border-width: 3px;
  }
  100% {
    width: var(--max-size);
    height: var(--max-size);
    opacity: 0;
    border-width: 1px;
  }
}
</style>
