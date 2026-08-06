import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bot,
  CalendarDays,
  FileText,
  LayoutTemplate,
  Home,
  Settings,
  Users,
} from "lucide-react";
import { DemoBadge } from "../common/DemoBadge";
import { platform as en } from "../../locales/en";
import { platform as es } from "../../locales/es";
import { navigation as enNavigation } from "../../locales/en";
import { navigation as esNavigation } from "../../locales/es";
import { WhatsAppAssistantWidget } from "../WhatsAppAssistantWidget";
import { LanguageSwitcher } from "../common/LanguageSwitcher";

export function DemoLayout({ locale }: { locale: "en" | "es" }) {
  const t = locale === "en" ? en : es;
  const navigation = locale === "en" ? enNavigation : esNavigation;
  const location = useLocation();
  const base = `/${locale}/app`;
  const query = location.search;
  const items = [
    [locale === "en" ? "dashboard" : "panel", t.nav.dashboard, BarChart3],
    [locale === "en" ? "documents" : "documentos", t.nav.documents, FileText],
    [locale === "en" ? "crm" : "clientes", t.nav.crm, Users],
    [locale === "en" ? "calendar" : "calendario", t.nav.calendar, CalendarDays],
    [locale === "en" ? "analytics" : "analitica", t.nav.analytics, BarChart3],
    [locale === "en" ? "ai-studio" : "estudio-ia", t.nav.ai, Bot],
    [
      locale === "en" ? "marketplace" : "mercado",
      locale === "en" ? t.nav.marketplace : "Mercado",
      LayoutTemplate,
    ],
  ] as const;
  const comingSoon = locale === "en" ? "Coming Soon" : "Próximamente";
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <header className="flex h-16 items-center justify-between border-b bg-white/80 px-5 backdrop-blur">
        <b className="text-navy">
          NEXT STUDIO <span className="text-brand">AI</span>
        </b>
        <div className="flex items-center gap-2">
          <DemoBadge text={locale === "en" ? "Demo Version" : "Versión Demo"} />
          <LanguageSwitcher />
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1400px] md:grid-cols-[220px_1fr]">
        <aside className="border-r bg-white/70 p-3 md:min-h-[calc(100vh-64px)] md:p-4">
          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            <Link
              className="col-span-2 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold text-brand transition hover:border-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand md:col-span-1"
              to={`/${locale}`}
              aria-label={navigation.backHome}
              title={navigation.backHome}
            >
              <Home size={16} aria-hidden="true" />
              <span className="truncate">{navigation.backHome}</span>
            </Link>
            {items.map(([path, label, Icon]) => (
              <Link
                key={path}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                to={`${base}/${path}${query}`}
              >
                <Icon size={16} />
                <span className="truncate">{label}</span>
              </Link>
            ))}
            <span
              aria-label={`${t.nav.settings}: ${comingSoon}`}
              aria-disabled="true"
              title={comingSoon}
              className="flex cursor-not-allowed items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-400"
            >
              <Settings size={16} />
              <span className="truncate">{t.nav.settings}</span>
              <small className="ml-auto text-[10px]">{comingSoon}</small>
            </span>
          </nav>
        </aside>
        <main className="min-w-0 p-4 md:p-7">
          <Outlet />
        </main>
      </div>
      <WhatsAppAssistantWidget locale={locale} />
    </div>
  );
}
