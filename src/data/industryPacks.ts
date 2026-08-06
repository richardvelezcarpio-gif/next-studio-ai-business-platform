export type Locale = "en" | "es";

export type IndustryId =
  | "construction"
  | "printing"
  | "restaurant"
  | "marketing"
  | "cleaning"
  | "roofing"
  | "real-estate"
  | "consulting"
  | "beauty"
  | "automotive";

type Localized = { en: string; es: string };
export type DemoMetric = Localized & { value: string };
export type DemoCustomer = {
  name: string;
  company: string;
  email: string;
  phone: string;
};
export type DemoEvent = Localized & {
  date: string;
  time: string;
  customer: string;
};

export type IndustryPack = {
  id: IndustryId;
  name: Localized;
  title: Localized;
  description: Localized;
  tools: Localized[];
  metrics: DemoMetric[];
  customers: DemoCustomer[];
  events: DemoEvent[];
  ai: { prompt: Localized; sections: Localized[] };
};

const localized = (en: string, es: string): Localized => ({ en, es });
const customers = (items: [string, string][]): DemoCustomer[] =>
  items.map(([name, company], index) => ({
    name,
    company,
    email: `contact${index + 1}@demo.local`,
    phone: `(239) 555-01${10 + index}`,
  }));
const events = (
  items: [string, string, string, string, string][],
): DemoEvent[] =>
  items.map(([en, es, date, time, customer]) => ({
    en,
    es,
    date,
    time,
    customer,
  }));
const metrics = (items: [string, string, string][]): DemoMetric[] =>
  items.map(([en, es, value]) => ({ en, es, value }));

export const industryPacks: IndustryPack[] = [
  {
    id: "construction",
    name: localized("Construction", "Construcción"),
    title: localized(
      "Construction Business Pack",
      "Pack empresarial de construcción",
    ),
    description: localized(
      "Keep projects, estimates, crews and client approvals organized in one demo workspace.",
      "Organiza proyectos, estimados, equipos y aprobaciones de clientes en un espacio demo.",
    ),
    tools: [
      localized("Project invoice", "Factura de proyecto"),
      localized("Construction estimate", "Estimado de construcción"),
      localized("Client proposal", "Propuesta para cliente"),
    ],
    metrics: metrics([
      ["Active projects", "Proyectos activos", "8"],
      ["Estimates sent", "Estimados enviados", "12"],
      ["Outstanding invoices", "Facturas pendientes", "4"],
      ["Demo revenue", "Ingresos demo", "$42,500"],
    ]),
    customers: customers([
      ["Mia Rivera", "Rivera Construction"],
      ["Jordan Lee", "Northside Renovations"],
    ]),
    events: events([
      [
        "Site inspection",
        "Inspección de obra",
        "2026-08-12",
        "09:00",
        "Rivera Construction",
      ],
      [
        "Estimate follow-up",
        "Seguimiento de estimado",
        "2026-08-14",
        "11:00",
        "Northside Renovations",
      ],
      [
        "Project start",
        "Inicio de proyecto",
        "2026-08-18",
        "08:00",
        "Rivera Construction",
      ],
    ]),
    ai: {
      prompt: localized(
        "Create a construction proposal for a residential renovation.",
        "Crea una propuesta de construcción para una renovación residencial.",
      ),
      sections: [
        localized("Project overview", "Resumen del proyecto"),
        localized("Scope of work", "Alcance del trabajo"),
        localized("Materials and labor", "Materiales y mano de obra"),
        localized("Timeline", "Cronograma"),
        localized("Investment", "Inversión"),
      ],
    },
  },
  {
    id: "printing",
    name: localized("Printing", "Imprenta"),
    title: localized(
      "Print Shop Business Pack",
      "Pack empresarial de imprenta",
    ),
    description: localized(
      "Manage print specifications, quotes, production work and delivery-ready documents.",
      "Gestiona especificaciones de impresión, cotizaciones, producción y documentos listos para entrega.",
    ),
    tools: [
      localized("Print order invoice", "Factura de orden de impresión"),
      localized("Print quote", "Cotización de impresión"),
      localized("Production proposal", "Propuesta de producción"),
    ],
    metrics: metrics([
      ["Active orders", "Órdenes activas", "16"],
      ["Quotes pending", "Cotizaciones pendientes", "9"],
      ["Jobs in production", "Trabajos en producción", "6"],
      ["Demo revenue", "Ingresos demo", "$18,900"],
    ]),
    customers: customers([
      ["Ana Morales", "Brooklyn Café"],
      ["Eli Rivera", "Rivera Roofing"],
    ]),
    events: events([
      [
        "Artwork approval",
        "Aprobación de arte",
        "2026-08-11",
        "10:00",
        "Brooklyn Café",
      ],
      [
        "Production deadline",
        "Fecha límite de producción",
        "2026-08-13",
        "14:00",
        "Rivera Roofing",
      ],
      [
        "Customer pickup",
        "Recogida del cliente",
        "2026-08-15",
        "16:00",
        "Brooklyn Café",
      ],
    ]),
    ai: {
      prompt: localized(
        "Create a print production proposal for a restaurant menu run.",
        "Crea una propuesta de producción impresa para una tirada de menús de restaurante.",
      ),
      sections: [
        localized("Print specifications", "Especificaciones de impresión"),
        localized("Quantity", "Cantidad"),
        localized("Materials", "Materiales"),
        localized("Production timeline", "Cronograma de producción"),
        localized("Delivery terms", "Términos de entrega"),
      ],
    },
  },
  {
    id: "restaurant",
    name: localized("Restaurant", "Restaurante"),
    title: localized(
      "Restaurant & Catering Pack",
      "Pack de restaurante y catering",
    ),
    description: localized(
      "Create polished catering proposals and keep event billing and follow-ups visible.",
      "Crea propuestas de catering profesionales y mantén visibles la facturación y los seguimientos de eventos.",
    ),
    tools: [
      localized("Catering invoice", "Factura de catering"),
      localized("Event estimate", "Estimado de evento"),
      localized("Menu proposal", "Propuesta de menú"),
    ],
    metrics: metrics([
      ["Catering requests", "Solicitudes de catering", "11"],
      ["Event proposals", "Propuestas de eventos", "7"],
      ["Open invoices", "Facturas abiertas", "5"],
      ["Demo revenue", "Ingresos demo", "$24,600"],
    ]),
    customers: customers([
      ["Lucía Torres", "Casa Latina Catering"],
      ["Noah Grant", "Harbor Events"],
    ]),
    events: events([
      [
        "Catering consultation",
        "Consulta de catering",
        "2026-08-10",
        "12:00",
        "Casa Latina Catering",
      ],
      [
        "Menu review",
        "Revisión de menú",
        "2026-08-12",
        "15:00",
        "Harbor Events",
      ],
      [
        "Event delivery",
        "Entrega de evento",
        "2026-08-17",
        "10:00",
        "Casa Latina Catering",
      ],
    ]),
    ai: {
      prompt: localized(
        "Draft a catering proposal for a corporate lunch event.",
        "Redacta una propuesta de catering para un almuerzo corporativo.",
      ),
      sections: [
        localized("Event overview", "Resumen del evento"),
        localized("Menu selection", "Selección de menú"),
        localized("Guest count", "Número de invitados"),
        localized("Service timeline", "Cronograma de servicio"),
        localized("Investment", "Inversión"),
      ],
    },
  },
  {
    id: "marketing",
    name: localized("Marketing", "Marketing"),
    title: localized("Marketing Agency Pack", "Pack de agencia de marketing"),
    description: localized(
      "Present campaign scopes, creative deliverables and monthly retainers with confidence.",
      "Presenta alcances de campañas, entregables creativos y retainers mensuales con confianza.",
    ),
    tools: [
      localized("Retainer invoice", "Factura de retainer"),
      localized("Campaign estimate", "Estimado de campaña"),
      localized("Marketing proposal", "Propuesta de marketing"),
    ],
    metrics: metrics([
      ["Active campaigns", "Campañas activas", "14"],
      ["Proposals open", "Propuestas abiertas", "6"],
      ["Monthly retainers", "Retainers mensuales", "10"],
      ["Demo revenue", "Ingresos demo", "$31,800"],
    ]),
    customers: customers([
      ["Avery Chen", "Bright Ideas Co."],
      ["Sofía Vega", "Northstar Media"],
    ]),
    events: events([
      [
        "Campaign kickoff",
        "Inicio de campaña",
        "2026-08-11",
        "09:30",
        "Bright Ideas Co.",
      ],
      [
        "Creative review",
        "Revisión creativa",
        "2026-08-13",
        "13:00",
        "Northstar Media",
      ],
      [
        "Performance report",
        "Informe de desempeño",
        "2026-08-16",
        "10:30",
        "Bright Ideas Co.",
      ],
    ]),
    ai: {
      prompt: localized(
        "Create a marketing proposal for a three-month social media campaign.",
        "Crea una propuesta de marketing para una campaña de redes sociales de tres meses.",
      ),
      sections: [
        localized("Campaign goals", "Objetivos de campaña"),
        localized("Creative direction", "Dirección creativa"),
        localized("Deliverables", "Entregables"),
        localized("Reporting cadence", "Frecuencia de reportes"),
        localized("Investment", "Inversión"),
      ],
    },
  },
  {
    id: "cleaning",
    name: localized("Cleaning", "Limpieza"),
    title: localized("Cleaning Services Pack", "Pack de servicios de limpieza"),
    description: localized(
      "Track recurring clients, service visits, estimates and cleaning agreements in one place.",
      "Controla clientes recurrentes, visitas de servicio, estimados y acuerdos de limpieza en un solo lugar.",
    ),
    tools: [
      localized("Service invoice", "Factura de servicio"),
      localized("Cleaning estimate", "Estimado de limpieza"),
      localized("Service proposal", "Propuesta de servicio"),
    ],
    metrics: metrics([
      ["Recurring clients", "Clientes recurrentes", "24"],
      ["Jobs this week", "Servicios esta semana", "11"],
      ["Pending invoices", "Facturas pendientes", "5"],
      ["Demo revenue", "Ingresos demo", "$12,400"],
    ]),
    customers: customers([
      ["María Ortiz", "Green Clean Services"],
      ["Cole Martin", "Harbor Offices"],
    ]),
    events: events([
      [
        "Recurring service",
        "Servicio recurrente",
        "2026-08-11",
        "08:00",
        "Green Clean Services",
      ],
      ["Walkthrough", "Recorrido", "2026-08-13", "11:30", "Harbor Offices"],
      [
        "Quality follow-up",
        "Seguimiento de calidad",
        "2026-08-15",
        "15:00",
        "Green Clean Services",
      ],
    ]),
    ai: {
      prompt: localized(
        "Prepare a recurring office cleaning service proposal.",
        "Prepara una propuesta de servicio recurrente de limpieza de oficinas.",
      ),
      sections: [
        localized("Service overview", "Resumen del servicio"),
        localized("Cleaning schedule", "Calendario de limpieza"),
        localized("Included tasks", "Tareas incluidas"),
        localized("Quality standards", "Estándares de calidad"),
        localized("Monthly investment", "Inversión mensual"),
      ],
    },
  },
  {
    id: "roofing",
    name: localized("Roofing", "Techos"),
    title: localized(
      "Roofing Contractor Pack",
      "Pack para contratista de techos",
    ),
    description: localized(
      "Organize inspections, roofing scopes, insurance-ready estimates and customer approvals.",
      "Organiza inspecciones, alcances de techos, estimados listos para seguros y aprobaciones de clientes.",
    ),
    tools: [
      localized("Roofing invoice", "Factura de techos"),
      localized("Roof inspection estimate", "Estimado de inspección"),
      localized("Roofing proposal", "Propuesta de techos"),
    ],
    metrics: metrics([
      ["Roof inspections", "Inspecciones de techo", "13"],
      ["Estimates pending", "Estimados pendientes", "8"],
      ["Projects scheduled", "Proyectos programados", "6"],
      ["Demo revenue", "Ingresos demo", "$38,200"],
    ]),
    customers: customers([
      ["Derek Hall", "Rivera Roofing"],
      ["Nina Patel", "Summit Homes"],
    ]),
    events: events([
      [
        "Roof inspection",
        "Inspección de techo",
        "2026-08-10",
        "09:00",
        "Rivera Roofing",
      ],
      [
        "Insurance review",
        "Revisión de seguro",
        "2026-08-12",
        "13:30",
        "Summit Homes",
      ],
      [
        "Material delivery",
        "Entrega de materiales",
        "2026-08-16",
        "08:30",
        "Rivera Roofing",
      ],
    ]),
    ai: {
      prompt: localized(
        "Prepare a roofing replacement proposal after a site inspection.",
        "Prepara una propuesta de reemplazo de techo después de una inspección.",
      ),
      sections: [
        localized("Inspection findings", "Hallazgos de inspección"),
        localized("Recommended scope", "Alcance recomendado"),
        localized("Materials", "Materiales"),
        localized("Installation timeline", "Cronograma de instalación"),
        localized("Warranty terms", "Términos de garantía"),
      ],
    },
  },
  {
    id: "real-estate",
    name: localized("Real Estate", "Bienes raíces"),
    title: localized(
      "Real Estate Business Pack",
      "Pack empresarial de bienes raíces",
    ),
    description: localized(
      "Present listing services, transaction support and client-ready property proposals.",
      "Presenta servicios de listados, apoyo de transacciones y propuestas inmobiliarias para clientes.",
    ),
    tools: [
      localized("Service invoice", "Factura de servicio"),
      localized("Listing estimate", "Estimado de listado"),
      localized("Property proposal", "Propuesta de propiedad"),
    ],
    metrics: metrics([
      ["Active listings", "Listados activos", "19"],
      ["Buyer consultations", "Consultas de compradores", "12"],
      ["Offers in review", "Ofertas en revisión", "4"],
      ["Demo revenue", "Ingresos demo", "$27,300"],
    ]),
    customers: customers([
      ["Olivia Brooks", "Blue Key Realty"],
      ["Mateo Reyes", "Coastal Property Group"],
    ]),
    events: events([
      [
        "Listing consultation",
        "Consulta de listado",
        "2026-08-11",
        "10:00",
        "Blue Key Realty",
      ],
      [
        "Property showing",
        "Visita de propiedad",
        "2026-08-13",
        "16:00",
        "Coastal Property Group",
      ],
      [
        "Offer review",
        "Revisión de oferta",
        "2026-08-15",
        "11:00",
        "Blue Key Realty",
      ],
    ]),
    ai: {
      prompt: localized(
        "Create a premium listing services proposal for a new seller.",
        "Crea una propuesta premium de servicios de listado para un nuevo vendedor.",
      ),
      sections: [
        localized("Property positioning", "Posicionamiento de propiedad"),
        localized("Marketing plan", "Plan de marketing"),
        localized("Showing strategy", "Estrategia de visitas"),
        localized("Timeline", "Cronograma"),
        localized("Service investment", "Inversión del servicio"),
      ],
    },
  },
  {
    id: "consulting",
    name: localized("Consulting", "Consultoría"),
    title: localized(
      "Professional Consulting Pack",
      "Pack de consultoría profesional",
    ),
    description: localized(
      "Frame advisory work, retainers, milestones and executive recommendations clearly.",
      "Define claramente trabajo de asesoría, retainers, hitos y recomendaciones ejecutivas.",
    ),
    tools: [
      localized("Consulting invoice", "Factura de consultoría"),
      localized("Advisory estimate", "Estimado de asesoría"),
      localized("Consulting proposal", "Propuesta de consultoría"),
    ],
    metrics: metrics([
      ["Active engagements", "Proyectos activos", "9"],
      ["Discovery calls", "Llamadas de descubrimiento", "15"],
      ["Retainers", "Retainers", "7"],
      ["Demo revenue", "Ingresos demo", "$35,700"],
    ]),
    customers: customers([
      ["Grace Morgan", "Morgan Advisory"],
      ["Luis Díaz", "Summit Strategy"],
    ]),
    events: events([
      [
        "Discovery session",
        "Sesión de descubrimiento",
        "2026-08-10",
        "11:00",
        "Morgan Advisory",
      ],
      [
        "Strategy workshop",
        "Taller de estrategia",
        "2026-08-14",
        "09:00",
        "Summit Strategy",
      ],
      [
        "Executive review",
        "Revisión ejecutiva",
        "2026-08-17",
        "14:30",
        "Morgan Advisory",
      ],
    ]),
    ai: {
      prompt: localized(
        "Draft a consulting proposal for an operational strategy engagement.",
        "Redacta una propuesta de consultoría para un proyecto de estrategia operativa.",
      ),
      sections: [
        localized("Executive context", "Contexto ejecutivo"),
        localized("Engagement scope", "Alcance del proyecto"),
        localized("Workstreams", "Líneas de trabajo"),
        localized("Milestones", "Hitos"),
        localized("Retainer investment", "Inversión de retainer"),
      ],
    },
  },
  {
    id: "beauty",
    name: localized("Beauty", "Belleza"),
    title: localized("Beauty & Wellness Pack", "Pack de belleza y bienestar"),
    description: localized(
      "Coordinate client appointments, service packages and polished beauty business documents.",
      "Coordina citas de clientes, paquetes de servicios y documentos profesionales de belleza.",
    ),
    tools: [
      localized("Service invoice", "Factura de servicio"),
      localized("Package estimate", "Estimado de paquete"),
      localized("Beauty proposal", "Propuesta de belleza"),
    ],
    metrics: metrics([
      ["Appointments booked", "Citas reservadas", "32"],
      ["Service packages", "Paquetes de servicio", "14"],
      ["Pending balances", "Saldos pendientes", "6"],
      ["Demo revenue", "Ingresos demo", "$14,800"],
    ]),
    customers: customers([
      ["Emma Flores", "Glow Studio"],
      ["Camila Ruiz", "Bloom Wellness"],
    ]),
    events: events([
      [
        "Client consultation",
        "Consulta de cliente",
        "2026-08-11",
        "09:30",
        "Glow Studio",
      ],
      [
        "Service appointment",
        "Cita de servicio",
        "2026-08-12",
        "14:00",
        "Bloom Wellness",
      ],
      [
        "Package follow-up",
        "Seguimiento de paquete",
        "2026-08-16",
        "11:30",
        "Glow Studio",
      ],
    ]),
    ai: {
      prompt: localized(
        "Prepare a beauty service package proposal for a bridal client.",
        "Prepara una propuesta de paquete de belleza para una clienta de boda.",
      ),
      sections: [
        localized("Client goals", "Objetivos del cliente"),
        localized("Recommended services", "Servicios recomendados"),
        localized("Appointment plan", "Plan de citas"),
        localized("Package value", "Valor del paquete"),
        localized("Booking terms", "Términos de reserva"),
      ],
    },
  },
  {
    id: "automotive",
    name: localized("Automotive", "Automotriz"),
    title: localized("Automotive Service Pack", "Pack de servicio automotriz"),
    description: localized(
      "Keep repair estimates, work orders, service appointments and customer approvals aligned.",
      "Mantén alineados estimados de reparación, órdenes de trabajo, citas de servicio y aprobaciones de clientes.",
    ),
    tools: [
      localized("Repair invoice", "Factura de reparación"),
      localized("Service estimate", "Estimado de servicio"),
      localized("Repair proposal", "Propuesta de reparación"),
    ],
    metrics: metrics([
      ["Vehicles in service", "Vehículos en servicio", "18"],
      ["Estimates awaiting approval", "Estimados esperando aprobación", "7"],
      ["Completed repairs", "Reparaciones completadas", "23"],
      ["Demo revenue", "Ingresos demo", "$29,400"],
    ]),
    customers: customers([
      ["Carlos Bennett", "Metro Auto Care"],
      ["Jasmine Reed", "Precision Garage"],
    ]),
    events: events([
      [
        "Vehicle inspection",
        "Inspección de vehículo",
        "2026-08-10",
        "08:30",
        "Metro Auto Care",
      ],
      [
        "Repair approval",
        "Aprobación de reparación",
        "2026-08-12",
        "13:00",
        "Precision Garage",
      ],
      [
        "Service pickup",
        "Recogida de servicio",
        "2026-08-15",
        "17:00",
        "Metro Auto Care",
      ],
    ]),
    ai: {
      prompt: localized(
        "Create an automotive repair proposal for a fleet maintenance client.",
        "Crea una propuesta de reparación automotriz para un cliente de mantenimiento de flotas.",
      ),
      sections: [
        localized("Vehicle assessment", "Evaluación del vehículo"),
        localized("Recommended repairs", "Reparaciones recomendadas"),
        localized("Parts and labor", "Piezas y mano de obra"),
        localized("Service timeline", "Cronograma de servicio"),
        localized("Approval terms", "Términos de aprobación"),
      ],
    },
  },
];

export const getIndustryPack = (id: string | null | undefined): IndustryPack =>
  industryPacks.find((pack) => pack.id === id) ?? industryPacks[0];

export const copy = (locale: Locale, value: Localized) => value[locale];
