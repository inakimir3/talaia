import {labels} from "./ui";

const defaultLang = "es";

export function useTranslations(lang: keyof typeof labels) {
    return function translate(key: keyof typeof labels[typeof defaultLang]) {
        return labels[lang][key] || labels[defaultLang][key];
    }
}

export const routes = {
  reservas: {
    es: "/reservas",
    en: "/bookings",
  },
  cancelacion: {
    es: "/cancelacion-y-devolucion",
    en: "/cancellation-and-refund",
  },
  home: {
    es: "/",
    en: "/",
  },
} as const;


export const getLocalizedRoute = (
  key: keyof typeof routes,
  lang: string
) => {
  const route = routes[key][lang as "es" | "en"] || routes[key].es;

  if (lang === "es") return route;
  return `/${lang}${route}`;
};

export function translatePath(
  path: string,
  currentLang: "es" | "en",
  targetLang: "es" | "en"
) {
  // Normalizar path
  let cleanPath = path;

  // quitar trailing slash
  if (cleanPath.length > 1) {
    cleanPath = cleanPath.replace(/\/$/, "");
  }

  // Si idioma actual es inglés, quitar /en
  if (currentLang === "en" && cleanPath.startsWith("/en")) {
    cleanPath = cleanPath.replace(/^\/en/, "") || "/";
  }

  // Buscar coincidencia
  for (const route of Object.values(routes)) {
    if (
      route[currentLang] === cleanPath ||
      route.es === cleanPath ||
      route.en === cleanPath
    ) {
      return route[targetLang];
    }
  }

  return cleanPath;
}



