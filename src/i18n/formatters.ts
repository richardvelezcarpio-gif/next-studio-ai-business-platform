import type { AppLocale } from "./routes";
const region:Record<AppLocale,string>={en:"en-US",es:"es-ES"};
export const formatCurrency=(value:number,currency:string,locale:AppLocale)=>new Intl.NumberFormat(region[locale],{style:"currency",currency}).format(value);
export const formatDate=(value:Date|string,locale:AppLocale)=>new Intl.DateTimeFormat(region[locale],{dateStyle:"long"}).format(new Date(value));
export const formatPercent=(value:number,locale:AppLocale)=>new Intl.NumberFormat(region[locale],{style:"percent",maximumFractionDigits:1}).format(value);
