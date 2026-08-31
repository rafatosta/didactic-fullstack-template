/** INFRAESTRUTURA: Vite, React, Tailwind e proxy local da API. */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": "http://127.0.0.1:3000",
        },
    },
});
