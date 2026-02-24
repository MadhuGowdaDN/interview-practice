import react from "@vitejs/plugin-react";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),

    AutoImport({
      imports: [
        "react",
        {
          "react-router-dom": [
            "useNavigate",
            "useParams",
            "useLocation",
            "Link",
          ],
        },
      ],
      dts: true, // generates auto-imports.d.ts for TS support
      eslintrc: {
        enabled: true, // auto generate ESLint config
      },
    }),
  ],
  server: {
    port: 3001, // Change this to your desired port
    open: true, // Automatically open browser
    host: true, // Expose to network
    strictPort: true, // Fail if port is already in use
  },
  preview: {
    port: 8080, // Port for preview (npm run preview)
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@react": path.resolve(__dirname, "./src/components/common"),
      "@common": path.resolve(__dirname, "./src/components/common/mui/components"),
      "@icon": path.resolve(__dirname, "./src/components/common/mui/icons"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
});
