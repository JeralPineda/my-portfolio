// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jeralpineda.dev",
  // La hoja completa pesa ~9 KB; inlinearla evita una petición
  // que bloquea el render en móvil.
  build: { inlineStylesheets: "always" },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
