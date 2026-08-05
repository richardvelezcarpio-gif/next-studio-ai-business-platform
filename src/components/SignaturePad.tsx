import { useState } from "react";
export interface SignatureValue{value:string;date:string;timestamp:string}
export function SignaturePad({label,onSign}:{label:string;onSign?:(value:SignatureValue)=>void}){const [value,setValue]=useState("");return <label className="block text-sm font-bold">{label}<input className="mt-2 w-full rounded-xl border border-blue-100 p-3 font-serif text-xl" value={value} onChange={e=>{setValue(e.target.value);onSign?.({value:e.target.value,date:new Date().toISOString().slice(0,10),timestamp:new Date().toISOString()})}}/></label>}
