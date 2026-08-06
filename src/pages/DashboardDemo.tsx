import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  CircleDollarSign,
  FileText,
  FileWarning,
  Plus,
  TrendingUp,
} from "lucide-react";
import { copy, getIndustryPack } from "../data/industryPacks";
import { platformRoutes } from "../components/platform/PlatformDemoModules";

const text = (locale: "en" | "es", en: string, es: string) =>
  locale === "en" ? en : es;

export function DashboardDemo() {
  const [searchParams] = useSearchParams();
  const locale = window.location.pathname.startsWith("/es/") ? "es" : "en";
  const pack = getIndustryPack(searchParams.get("industry"));
  const documentPath = platformRoutes.withIndustry(
    `/${locale}/app/${locale === "en" ? "documents" : "documentos"}`,
    pack,
  );
  const icons = [CircleDollarSign, FileWarning, FileText, TrendingUp];
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">
            NEXT STUDIO / {text(locale, "LIVE OVERVIEW", "RESUMEN EN VIVO")}
          </p>
          <h1 className="mt-2 text-3xl font-black">
            {text(
              locale,
              "Business, beautifully organized.",
              "Tu negocio, bellamente organizado.",
            )}
          </h1>
          <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand">
            {text(locale, "Demo Data", "Datos de demostración")} ·{" "}
            {copy(locale, pack.name)}
          </span>
        </div>
        <Link className="primary" to={documentPath}>
          <Plus size={17} />
          {text(locale, "Create New Document", "Crear nuevo documento")}
        </Link>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pack.metrics.map((metric, index) => {
          const Icon = icons[index];
          return (
            <motion.article
              whileHover={{ y: -4 }}
              className="premium-card p-5"
              key={metric.en}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">
                  {copy(locale, metric)}
                </span>
                <Icon size={18} className="text-brand" />
              </div>
              <strong className="mt-4 block text-3xl tracking-tight text-navy">
                {metric.value}
              </strong>
              <span className="mt-2 inline-block text-xs font-bold text-brand">
                {text(locale, "Demo data", "Datos demo")}
              </span>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
        <article className="premium-card p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-brand" />
            <div>
              <h2 className="font-black">
                {text(locale, "Document growth", "Crecimiento de documentos")}
              </h2>
              <p className="text-sm text-slate-500">
                {text(
                  locale,
                  "An illustrative view of activity.",
                  "Una vista ilustrativa de la actividad.",
                )}
              </p>
            </div>
          </div>
          <div className="mt-9 flex h-48 items-end gap-3">
            {[36, 64, 48, 82, 61, 92, 76].map((height, index) => (
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.08 }}
                className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-sky-300"
                key={height}
              />
            ))}
          </div>
        </article>
        <article className="premium-card p-6">
          <h2 className="font-black">
            {text(locale, "Recent demo activity", "Actividad demo reciente")}
          </h2>
          {pack.events.slice(0, 3).map((event, index) => (
            <div className="mt-5 flex items-center gap-3" key={event.en}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-brand">
                0{index + 1}
              </span>
              <p className="text-sm font-semibold">
                {copy(locale, event)}
                <br />
                <span className="font-normal text-slate-400">
                  {event.customer}
                </span>
              </p>
            </div>
          ))}
        </article>
      </div>
      <article className="premium-card mt-5 p-6">
        <h2 className="font-black">
          {text(locale, "Latest demo documents", "Últimos documentos demo")}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {pack.tools.map((tool, index) => (
            <div
              className="rounded-xl border border-white/70 bg-white/60 p-4"
              key={tool.en}
            >
              <FileText className="mb-5 text-brand" size={20} />
              <b className="text-sm">{copy(locale, tool)}</b>
              <p className="mt-1 text-xs text-slate-500">
                {text(locale, "Demo document", "Documento demo")} 0{index + 1}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
