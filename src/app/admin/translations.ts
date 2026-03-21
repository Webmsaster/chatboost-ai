const translations = {
  de: {
    login: {
      title: "Admin Login",
      username: "Benutzername",
      password: "Passwort",
      submit: "Anmelden",
      error: "Login fehlgeschlagen",
      networkError: "Netzwerkfehler",
    },
    dashboard: {
      title: "Admin Dashboard",
      logout: "Abmelden",
      loading: "Laden...",
      empty: "Keine Einträge vorhanden",
      orders: "Bestellungen",
      contacts: "Kontaktanfragen",
      subscribers: "Newsletter Abonnenten",
      revenue: "Umsatz",
      tabs: {
        orders: "Bestellungen",
        contacts: "Kontaktanfragen",
        subscribers: "Newsletter",
      },
      columns: {
        plan: "Plan",
        amount: "Betrag",
        customer: "Kunde",
        email: "Email",
        status: "Status",
        date: "Datum",
        name: "Name",
        industry: "Branche",
        message: "Nachricht",
        subscribedAt: "Angemeldet am",
      },
      pagination: {
        previous: "Zurück",
        next: "Weiter",
        page: "Seite",
        of: "von",
        entries: "Einträge",
      },
    },
  },
  en: {
    login: {
      title: "Admin Login",
      username: "Username",
      password: "Password",
      submit: "Sign in",
      error: "Login failed",
      networkError: "Network error",
    },
    dashboard: {
      title: "Admin Dashboard",
      logout: "Sign out",
      loading: "Loading...",
      empty: "No entries found",
      orders: "Orders",
      contacts: "Contact Requests",
      subscribers: "Newsletter Subscribers",
      revenue: "Revenue",
      tabs: {
        orders: "Orders",
        contacts: "Contact Requests",
        subscribers: "Newsletter",
      },
      columns: {
        plan: "Plan",
        amount: "Amount",
        customer: "Customer",
        email: "Email",
        status: "Status",
        date: "Date",
        name: "Name",
        industry: "Industry",
        message: "Message",
        subscribedAt: "Subscribed at",
      },
      pagination: {
        previous: "Previous",
        next: "Next",
        page: "Page",
        of: "of",
        entries: "entries",
      },
    },
  },
} as const;

type Locale = keyof typeof translations;

export function getAdminLocale(): Locale {
  if (typeof navigator === "undefined") return "de";
  const lang = navigator.language.slice(0, 2);
  return lang === "en" ? "en" : "de";
}

export function useAdminTranslations() {
  const locale = getAdminLocale();
  return translations[locale];
}
