import { useI18n, useState } from "#imports";

export function useLocaleToggle() {
  const { locale, setLocale } = useI18n();
  const isTranslating = useState("isTranslating", () => false);

  const toggleLanguage = () => {
    if (isTranslating.value) return;
    isTranslating.value = true;
    setTimeout(() => {
      setLocale(locale.value === "id" ? "en" : "id");
      setTimeout(() => {
        isTranslating.value = false;
      }, 50);
    }, 300);
  };

  return { locale, toggleLanguage };
}
