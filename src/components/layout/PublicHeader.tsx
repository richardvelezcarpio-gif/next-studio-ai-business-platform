import { ExternalLink } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../common/Logo";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { en, navigation as enNavigation } from "../../locales/en";
import { es, navigation as esNavigation } from "../../locales/es";

export function PublicHeader({ locale }: { locale: "en" | "es" }) {
  const t = locale === "en" ? en : es;
  const navigation = locale === "en" ? enNavigation : esNavigation;
  const slug = (english: string, spanish: string) =>
    locale === "en" ? english : spanish;
  const nav = [
    ["templates", "plantillas", t.nav.templates],
    ["features", "funciones", t.nav.features],
    ["pricing", "precios", t.nav.pricing],
  ];
  const links = (
    <>
      {nav.map(([englishPath, spanishPath, label]) => (
        <NavLink
          key={englishPath}
          to={`/${locale}/${slug(englishPath, spanishPath)}`}
          className={({ isActive }) =>
            isActive ? "text-brand" : "hover:text-brand"
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
  const agencyLink = (
    <a
      className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-blue-100 px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-300 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
      href="https://www.nextstudio.agency/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={navigation.visitNextStudio}
    >
      {navigation.visitNextStudio}
      <ExternalLink size={14} aria-hidden="true" />
    </a>
  );
  return (
    <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/90 backdrop-blur">
      <div className="shell flex min-h-[72px] items-center justify-between gap-4">
        <Logo locale={locale} />
        <nav className="hidden gap-5 text-sm font-bold text-slate-600 md:flex">
          <Link to={`/${locale}/demo`}>{t.nav.demo}</Link>
          {links}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {agencyLink}
          <LanguageSwitcher />
          <Link
            className="primary text-sm"
            to={`/${locale}/${slug("pricing", "precios")}`}
          >
            {t.nav.buy}
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Link
            className="primary text-sm"
            to={`/${locale}/${slug("pricing", "precios")}`}
          >
            {t.nav.buy}
          </Link>
        </div>
      </div>
      <nav
        aria-label="Marketing"
        className="shell flex gap-3 overflow-x-auto border-t border-blue-50 py-3 text-sm font-bold text-slate-600 md:hidden"
      >
        <Link className="shrink-0" to={`/${locale}/demo`}>
          {t.nav.demo}
        </Link>
        {links}
        {agencyLink}
      </nav>
    </header>
  );
}
