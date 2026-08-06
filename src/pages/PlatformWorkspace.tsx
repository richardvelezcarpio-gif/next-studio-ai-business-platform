import { Link, useSearchParams } from "react-router-dom";
import {
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  PackageOpen,
  Users,
} from "lucide-react";
import { getIndustryPack, type Locale } from "../data/industryPacks";
import {
  AiStudio,
  DemoAnalytics,
  DemoCalendar,
  DemoCrm,
  MarketplacePack,
  platformRoutes,
} from "../components/platform/PlatformDemoModules";

type Area = "ai" | "crm" | "calendar" | "analytics" | "marketplace";
type WorkspaceProps = { locale: Locale; area?: Area };
const label = (locale: Locale, en: string, es: string) =>
  locale === "en" ? en : es;
const icons = {
  ai: Bot,
  crm: Users,
  calendar: CalendarDays,
  analytics: ChartNoAxesCombined,
  marketplace: PackageOpen,
};

export function PlatformWorkspace({ locale, area = "ai" }: WorkspaceProps) {
  const [searchParams] = useSearchParams();
  const pack = getIndustryPack(searchParams.get("industry"));
  const tabs: { key: Area; label: string }[] = [
    { key: "ai", label: label(locale, "AI Studio", "Estudio IA") },
    { key: "crm", label: "CRM" },
    { key: "calendar", label: label(locale, "Calendar", "Calendario") },
    { key: "analytics", label: label(locale, "Analytics", "Analítica") },
    { key: "marketplace", label: label(locale, "Marketplace", "Mercado") },
  ];
  const path = (key: Area) =>
    platformRoutes.withIndustry(platformRoutes.appPath(locale, key), pack);
  const Icon = icons[area];

  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">NEXT STUDIO / BUSINESS OS</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              {area === "marketplace"
                ? label(locale, "Industry Marketplace", "Mercado por industria")
                : tabs.find((tab) => tab.key === area)?.label}
            </h1>
            <p className="mt-2 text-sm font-semibold text-brand">
              {label(locale, "Demo industry:", "Industria demo:")}{" "}
              {pack.name[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const TabIcon = icons[tab.key];
              return (
                <Link
                  aria-label={tab.label}
                  key={tab.key}
                  to={path(tab.key)}
                  className={area === tab.key ? "primary" : "secondary"}
                >
                  <TabIcon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        {area === "marketplace" && (
          <MarketplacePack locale={locale} pack={pack} />
        )}
        {area === "ai" && <AiStudio locale={locale} pack={pack} />}
        {area === "crm" && <DemoCrm locale={locale} pack={pack} />}
        {area === "calendar" && <DemoCalendar locale={locale} pack={pack} />}
        {area === "analytics" && <DemoAnalytics locale={locale} pack={pack} />}
        {area !== "marketplace" && (
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-sm">
            <Icon className="text-brand" size={18} />
            <Link
              className="font-bold text-brand underline"
              to={path("marketplace")}
            >
              {label(
                locale,
                "Return to Industry Marketplace",
                "Volver al mercado por industria",
              )}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
