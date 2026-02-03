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

export function translatePath(path: string, targetLang: "es" | "en") {
  // quitar idioma
  let cleanPath = path.replace(/^\/(en)(?=\/|$)/, "");

  // asegurar formato consistente
  cleanPath = cleanPath || "/";
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

  // quitar trailing slash excepto home
  if (cleanPath.length > 1) {
    cleanPath = cleanPath.replace(/\/$/, "");
  }

  for (const route of Object.values(routes)) {
    if (route.es === cleanPath || route.en === cleanPath) {
      return route[targetLang];
    }
  }

  return cleanPath;
}


