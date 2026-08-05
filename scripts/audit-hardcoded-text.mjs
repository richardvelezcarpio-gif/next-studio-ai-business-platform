import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
const root=new URL("../src/",import.meta.url),files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);entry.isDirectory()?await walk(path):/\.[jt]sx?$/.test(entry.name)&&files.push(path)}}
await walk(root.pathname);
// Legitimate visible tokens: product mark, file formats, communication channel and avatar initials.
const allowed=new Set(["AI","NEXT STUDIO","PDF","PNG","JPG","WhatsApp","RV"]),findings=[];
const add=(file,value)=>{const text=value.trim();if(text&&/[A-Za-zÁÉÍÓÚáéíóú]/.test(text)&&!allowed.has(text))findings.push(`${file.replace(root.pathname,"")}: ${text}`)};
for(const file of files){if(file.includes("/locales/"))continue;const source=await readFile(file,"utf8");const localized=/locales\/(?:en|es)|\btx\(/.test(source);if(!localized){for(const match of source.matchAll(/(?<!=)>([A-Za-zÁÉÍÓÚáéíóú][^<>{}\n]*)</g))add(file,match[1]);for(const match of source.matchAll(/(?:placeholder|title|aria-label|alt)=\"([^\"]+)\"/g))add(file,match[1]);for(const match of source.matchAll(/(?:toast\.(?:success|error)|alert)\(\"([^\"]+)\"/g))add(file,match[1])}}
if(findings.length){console.log("TODO: Remove hardcoded English text");console.log("TODO: Remove hardcoded Spanish text");console.log(findings.join("\n"));process.exit(1)}console.log("Localization audit passed. Exceptions: NEXT STUDIO, AI, PDF/PNG/JPG, WhatsApp, RV (brand, file formats, channel and fallback initials).");
