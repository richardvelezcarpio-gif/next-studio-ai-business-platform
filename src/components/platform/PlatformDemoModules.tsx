import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  Eye,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  copy,
  industryPacks,
  type DemoCustomer,
  type DemoEvent,
  type IndustryPack,
  type Locale,
} from "../../data/industryPacks";

type Props = { locale: Locale; pack: IndustryPack };
const text = (locale: Locale, en: string, es: string) =>
  locale === "en" ? en : es;
const appPath = (
  locale: Locale,
  area: "marketplace" | "ai" | "crm" | "calendar" | "analytics",
) => {
  const paths =
    locale === "en"
      ? {
          marketplace: "marketplace",
          ai: "ai-studio",
          crm: "crm",
          calendar: "calendar",
          analytics: "analytics",
        }
      : {
          marketplace: "mercado",
          ai: "estudio-ia",
          crm: "clientes",
          calendar: "calendario",
          analytics: "analitica",
        };
  return `/${locale}/app/${paths[area]}`;
};
const documentPath = (
  locale: Locale,
  type: "invoice" | "estimate" | "proposal",
) =>
  `/${locale}/demo/${locale === "en" ? type : { invoice: "factura", estimate: "estimado", proposal: "propuesta" }[type]}`;
const withIndustry = (path: string, pack: IndustryPack) =>
  `${path}?industry=${pack.id}`;

function Status({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "available" | "demo" | "soon";
}) {
  const value =
    kind === "available"
      ? text(locale, "Available", "Disponible")
      : kind === "demo"
        ? "Demo"
        : text(locale, "Coming Soon", "Próximamente");
  const color =
    kind === "available"
      ? "bg-emerald-50 text-emerald-700"
      : kind === "demo"
        ? "bg-blue-50 text-brand"
        : "bg-slate-100 text-slate-500";
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold ${color}`}>
      {value}
    </span>
  );
}

export function MarketplacePack({ locale, pack }: Props) {
  const navigate = useNavigate();
  const tools = [
    {
      label: text(locale, "Create Invoice", "Crear factura"),
      kind: "available" as const,
      to: documentPath(locale, "invoice"),
    },
    {
      label: text(locale, "Create Estimate", "Crear estimado"),
      kind: "available" as const,
      to: documentPath(locale, "estimate"),
    },
    {
      label: text(locale, "Create Proposal", "Crear propuesta"),
      kind: "available" as const,
      to: documentPath(locale, "proposal"),
    },
    {
      label: text(locale, "Open AI Studio", "Abrir Estudio IA"),
      kind: "demo" as const,
      to: appPath(locale, "ai"),
    },
    {
      label: text(locale, "Open CRM", "Abrir CRM"),
      kind: "demo" as const,
      to: appPath(locale, "crm"),
    },
    {
      label: text(locale, "Open Calendar", "Abrir calendario"),
      kind: "demo" as const,
      to: appPath(locale, "calendar"),
    },
    {
      label: text(locale, "View Analytics", "Ver analítica"),
      kind: "demo" as const,
      to: appPath(locale, "analytics"),
    },
  ];
  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
      <aside className="premium-card p-6">
        <p className="eyebrow">
          {text(locale, "INDUSTRY PACK", "PACK POR INDUSTRIA")}
        </p>
        <h2 className="mt-2 text-2xl font-black">{copy(locale, pack.title)}</h2>
        <p className="mt-3 leading-6 text-slate-600">
          {copy(locale, pack.description)}
        </p>
        <label className="mt-6 block text-sm font-bold">
          {text(locale, "Choose an industry", "Elige una industria")}
          <select
            className="mt-2 w-full rounded-xl border border-blue-100 bg-white p-3"
            value={pack.id}
            onChange={(event) =>
              navigate(
                withIndustry(
                  appPath(locale, "marketplace"),
                  industryPacks.find((item) => item.id === event.target.value)!,
                ),
              )
            }
          >
            {industryPacks.map((item) => (
              <option key={item.id} value={item.id}>
                {copy(locale, item.name)}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-6 rounded-2xl bg-blue-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-brand">
            {text(locale, "Recommended tools", "Herramientas recomendadas")}
          </p>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-700">
            {pack.tools.map((tool) => (
              <li key={tool.en}>✓ {copy(locale, tool)}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm">
          <span>{text(locale, "Settings", "Configuración")}</span>
          <Status locale={locale} kind="soon" />
        </div>
      </aside>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <article
            className="premium-card flex min-h-40 flex-col justify-between p-5"
            key={tool.label}
          >
            <div>
              <Status locale={locale} kind={tool.kind} />
              <h3 className="mt-5 font-black">{tool.label}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {copy(locale, pack.name)} ·{" "}
                {text(locale, "demo workspace", "espacio de demostración")}
              </p>
            </div>
            <Link
              className="secondary mt-5 w-fit text-sm"
              to={withIndustry(tool.to, pack)}
            >
              {text(locale, "Open", "Abrir")}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AiStudio({ locale, pack }: Props) {
  const [prompt, setPrompt] = useState(copy(locale, pack.ai.prompt));
  const [generated, setGenerated] = useState(false);
  const [preview, setPreview] = useState(false);
  const actions = [
    text(locale, "Create a proposal", "Crear una propuesta"),
    text(locale, "Write a client follow-up", "Redactar seguimiento al cliente"),
    text(locale, "Summarize my scope", "Resumir mi alcance"),
  ];
  const generate = () => setGenerated(true);
  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
      <aside className="premium-card p-6">
        <div className="flex items-center gap-3">
          <Bot className="text-brand" />
          <div>
            <p className="font-black">
              {text(locale, "AI Assistant", "Asistente IA")}
            </p>
            <span className="text-sm text-slate-500">
              {text(
                locale,
                "Demo response generator",
                "Generador de respuestas demo",
              )}
            </span>
          </div>
        </div>
        <div className="mt-5 grid gap-2">
          {actions.map((action) => (
            <button
              key={action}
              className="rounded-xl border border-blue-100 bg-white px-3 py-3 text-left text-sm font-semibold transition hover:border-blue-300 hover:text-brand"
              onClick={() => {
                setPrompt(`${action}: ${copy(locale, pack.ai.prompt)}`);
                setGenerated(true);
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </aside>
      <section className="premium-card p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-brand">
            <Bot />
          </span>
          <div>
            <h2 className="font-black">
              {text(
                locale,
                "AI Proposal Builder",
                "Creador de propuestas con IA",
              )}
            </h2>
            <p className="text-sm text-slate-500">
              {copy(locale, pack.title)} ·{" "}
              {text(locale, "Demo", "Demostración")}
            </p>
          </div>
        </div>
        <label className="mt-6 block text-sm font-bold">
          {text(locale, "What would you like to create?", "¿Qué deseas crear?")}
          <textarea
            className="mt-2 w-full rounded-xl border border-blue-100 p-3"
            rows={4}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </label>
        <button className="primary mt-5" onClick={generate}>
          <Bot size={16} />
          {text(locale, "Generate demo", "Generar demo")}
        </button>
        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5"
          >
            <div className="flex items-center gap-2 font-black text-emerald-700">
              <CheckCircle2 size={18} />
              {text(
                locale,
                "Demo-generated content",
                "Contenido generado como demo",
              )}
            </div>
            <p className="mt-3 text-sm text-slate-700">
              {copy(locale, pack.ai.prompt)}
            </p>
            <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
              {pack.ai.sections.map((section) => (
                <li key={section.en}>• {copy(locale, section)}</li>
              ))}
            </ul>
            <button className="secondary mt-5" onClick={() => setPreview(true)}>
              <Eye size={16} />
              {text(
                locale,
                "Preview full screen",
                "Vista previa a pantalla completa",
              )}
            </button>
          </motion.div>
        )}
      </section>
      {preview && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={text(
            locale,
            "Generated proposal preview",
            "Vista previa de propuesta generada",
          )}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">
                  {text(locale, "DEMO PREVIEW", "VISTA PREVIA DEMO")}
                </p>
                <h2 className="text-2xl font-black">
                  {copy(locale, pack.title)}
                </h2>
              </div>
              <button className="secondary" onClick={() => setPreview(false)}>
                {text(locale, "Close", "Cerrar")}
              </button>
            </div>
            <p className="mt-6 leading-7 text-slate-600">{prompt}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {pack.ai.sections.map((section, index) => (
                <div key={section.en} className="rounded-xl bg-blue-50 p-4">
                  <b>
                    {String(index + 1).padStart(2, "0")} ·{" "}
                    {copy(locale, section)}
                  </b>
                  <p className="mt-2 text-sm text-slate-600">
                    {text(
                      locale,
                      "Demo content tailored to this industry pack.",
                      "Contenido demo adaptado a este pack de industria.",
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DemoCrm({ locale, pack }: Props) {
  const [customers, setCustomers] = useState<DemoCustomer[]>(pack.customers);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DemoCustomer | null>(null);
  const [saved, setSaved] = useState(false);
  const visible = useMemo(
    () =>
      customers.filter((customer) =>
        `${customer.name} ${customer.company}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [customers, query],
  );
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setCustomers((current) => [
      ...current,
      {
        name: String(form.get("name")),
        company: String(form.get("company")),
        email: String(form.get("email")),
        phone: String(form.get("phone")),
      },
    ]);
    setOpen(false);
    setSaved(true);
    event.currentTarget.reset();
  };
  return (
    <section className="mt-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">
            {text(locale, "DEMO CRM", "CRM DE DEMOSTRACIÓN")}
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {text(locale, "Customers", "Clientes")} · {copy(locale, pack.name)}
          </h2>
        </div>
        <button className="primary" onClick={() => setOpen(true)}>
          <Plus size={16} />
          {text(locale, "Add customer", "Agregar cliente")}
        </button>
      </div>
      {saved && (
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          {text(
            locale,
            "Customer saved for this demo session.",
            "Cliente guardado para esta sesión demo.",
          )}
        </p>
      )}
      <label className="mt-5 flex max-w-xl items-center gap-2 rounded-xl border bg-white px-3">
        <Search size={17} className="text-slate-400" />
        <input
          className="w-full py-3 outline-none"
          value={query}
          placeholder={text(locale, "Search customers", "Buscar clientes")}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((customer) => (
          <button
            className="premium-card text-left p-5 transition hover:-translate-y-1"
            onClick={() => setSelected(customer)}
            key={`${customer.name}-${customer.company}`}
          >
            <Users className="text-brand" />
            <h3 className="mt-5 font-black">{customer.name}</h3>
            <p className="text-sm text-slate-500">{customer.company}</p>
            <span className="mt-4 inline-block text-sm font-bold text-brand">
              {text(locale, "View details", "Ver detalles")}
            </span>
          </button>
        ))}
      </div>
      {!visible.length && (
        <div className="premium-card mt-5 p-8 text-center text-slate-500">
          {text(
            locale,
            "No demo customers found.",
            "No se encontraron clientes demo.",
          )}
        </div>
      )}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={text(locale, "Add demo customer", "Agregar cliente demo")}
        >
          <form
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
            onSubmit={submit}
          >
            <h3 className="text-xl font-black">
              {text(locale, "Add demo customer", "Agregar cliente demo")}
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["name", text(locale, "Name", "Nombre")],
                ["company", text(locale, "Company", "Empresa")],
                ["email", text(locale, "Email", "Correo")],
                ["phone", text(locale, "Phone", "Teléfono")],
              ].map(([name, label]) => (
                <label className="text-sm font-bold" key={name}>
                  {label}
                  <input
                    required
                    name={name}
                    className="mt-1 w-full rounded-xl border border-blue-100 p-3"
                  />
                </label>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="secondary"
                onClick={() => setOpen(false)}
              >
                {text(locale, "Cancel", "Cancelar")}
              </button>
              <button className="primary">
                {text(locale, "Save demo customer", "Guardar cliente demo")}
              </button>
            </div>
          </form>
        </div>
      )}
      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={text(locale, "Customer details", "Detalles del cliente")}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-black">{selected.name}</h3>
            <p className="mt-1 text-slate-500">{selected.company}</p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div>
                <dt className="font-bold">{text(locale, "Email", "Correo")}</dt>
                <dd>{selected.email}</dd>
              </div>
              <div>
                <dt className="font-bold">
                  {text(locale, "Phone", "Teléfono")}
                </dt>
                <dd>{selected.phone}</dd>
              </div>
            </dl>
            <button
              className="secondary mt-5"
              onClick={() => setSelected(null)}
            >
              {text(locale, "Close", "Cerrar")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function DemoCalendar({ locale, pack }: Props) {
  const [events, setEvents] = useState<DemoEvent[]>(pack.events);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title"));
    setEvents((current) => [
      ...current,
      {
        en: title,
        es: title,
        date: String(form.get("date")),
        time: String(form.get("time")),
        customer: String(form.get("customer")),
      },
    ]);
    setOpen(false);
    setSaved(true);
    event.currentTarget.reset();
  };
  return (
    <section className="mt-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">
            {text(locale, "DEMO CALENDAR", "CALENDARIO DE DEMOSTRACIÓN")}
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {text(locale, "Upcoming events", "Próximos eventos")}
          </h2>
        </div>
        <button className="primary" onClick={() => setOpen(true)}>
          <Plus size={16} />
          {text(locale, "Create event", "Crear evento")}
        </button>
      </div>
      {saved && (
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          {text(
            locale,
            "Event saved for this demo session.",
            "Evento guardado para esta sesión demo.",
          )}
        </p>
      )}
      <div className="mt-5 grid gap-4">
        {events
          .sort((a, b) =>
            `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
          )
          .map((event) => (
            <article
              className="premium-card flex flex-wrap items-center justify-between gap-4 p-5"
              key={`${event.date}-${event.time}-${event.en}`}
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-brand">
                  <CalendarDays size={20} />
                </span>
                <div>
                  <h3 className="font-black">{copy(locale, event)}</h3>
                  <p className="text-sm text-slate-500">{event.customer}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-600">
                {event.date} · {event.time}
              </p>
            </article>
          ))}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={text(locale, "Create demo event", "Crear evento demo")}
        >
          <form
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
            onSubmit={submit}
          >
            <h3 className="text-xl font-black">
              {text(locale, "Create demo event", "Crear evento demo")}
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["title", text(locale, "Title", "Título"), "text"],
                ["date", text(locale, "Date", "Fecha"), "date"],
                ["time", text(locale, "Time", "Hora"), "time"],
                ["customer", text(locale, "Customer", "Cliente"), "text"],
              ].map(([name, label, type]) => (
                <label className="text-sm font-bold" key={name}>
                  {label}
                  <input
                    required
                    name={name}
                    type={type}
                    className="mt-1 w-full rounded-xl border border-blue-100 p-3"
                  />
                </label>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="secondary"
                onClick={() => setOpen(false)}
              >
                {text(locale, "Cancel", "Cancelar")}
              </button>
              <button className="primary">
                {text(locale, "Save demo event", "Guardar evento demo")}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export function DemoAnalytics({ locale, pack }: Props) {
  const bars = [45, 68, 54, 82, 61, 92, 76];
  return (
    <section className="mt-7">
      <div>
        <p className="eyebrow">
          {text(locale, "DEMO ANALYTICS", "ANALÍTICA DE DEMOSTRACIÓN")}
        </p>
        <h2 className="mt-2 text-3xl font-black">
          {copy(locale, pack.name)} ·{" "}
          {text(locale, "business overview", "resumen del negocio")}
        </h2>
        <p className="mt-2 text-slate-500">
          {text(
            locale,
            "Illustrative data only — not connected to a live account.",
            "Datos ilustrativos únicamente; no están conectados a una cuenta real.",
          )}
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pack.metrics.map((metric) => (
          <article className="premium-card p-5" key={metric.en}>
            <p className="text-sm font-bold text-slate-500">
              {copy(locale, metric)}
            </p>
            <strong className="mt-4 block text-3xl text-navy">
              {metric.value}
            </strong>
            <span className="mt-2 inline-block text-xs font-bold text-brand">
              {text(locale, "Demo data", "Datos de demostración")}
            </span>
          </article>
        ))}
      </div>
      <article className="premium-card mt-5 p-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-brand" />
          <div>
            <h3 className="font-black">
              {text(locale, "Demo performance", "Rendimiento de demostración")}
            </h3>
            <p className="text-sm text-slate-500">
              {text(
                locale,
                "A simple illustrative activity trend.",
                "Una tendencia de actividad ilustrativa.",
              )}
            </p>
          </div>
        </div>
        <div className="mt-9 flex h-48 items-end gap-3">
          {bars.map((height, index) => (
            <motion.span
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.06 }}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-sky-300"
              key={height}
            />
          ))}
        </div>
      </article>
    </section>
  );
}

export const platformRoutes = { appPath, withIndustry };
