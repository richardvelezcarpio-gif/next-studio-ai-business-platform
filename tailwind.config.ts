import type { Config } from "tailwindcss";
export default { content: ["./index.html", "./src/**/*.{ts,tsx}"], theme: { extend: { colors: { brand: "#0866F5", navy: "#081426", sky: "#D9ECFF" }, boxShadow: { premium: "0 18px 48px rgba(8, 49, 112, .12)" } } }, plugins: [] } satisfies Config;
