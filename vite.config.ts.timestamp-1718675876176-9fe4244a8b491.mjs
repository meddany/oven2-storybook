// vite.config.ts
import { defineConfig } from "file:///E:/Coding/Nextgen/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Coding/Nextgen/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import dts from "file:///E:/Coding/Nextgen/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Coding\\Nextgen";
var vite_config_default = defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/components/index.tsx"),
      name: "@nextgen/react",
      fileName: "nextgen"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "xlsx",
        "react-hooks-global-state",
        "@szhsin/react-menu",
        "file-saver",
        "react-toastify",
        "react-toastify/dist/ReactToastify.css",
        "@emotion/react",
        "@emotion/styled",
        "@mui/lab",
        "@mui/icons-material",
        "@mui/material",
        "@mui/material/styles",
        "@mui/styles",
        "require",
        "child_process",
        "ag-grid-react",
        "@szhsin",
        "clsx",
        "primereact"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RpbmdcXFxcTmV4dGdlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kaW5nXFxcXE5leHRnZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0NvZGluZy9OZXh0Z2VuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpICwgZHRzKHtyb2xsdXBUeXBlcyA6IHRydWUgfSldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lICwgJy4vc3JjJykgLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkIDoge1xuICAgIG1pbmlmeSA6IGZhbHNlICwgXG4gICAgbGliIDoge1xuICAgICAgZW50cnkgOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lICwgJy4vc3JjL2NvbXBvbmVudHMvaW5kZXgudHN4JyksXG4gICAgICBuYW1lIDogJ0BuZXh0Z2VuL3JlYWN0JyxcbiAgICAgIGZpbGVOYW1lIDogICduZXh0Z2VuJ1xuICAgIH0gLFxuICAgIHJvbGx1cE9wdGlvbnMgOiB7XG4gICAgICBleHRlcm5hbCA6IFtcbiAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgJ3JlYWN0LWRvbScgLFxuICAgICAgICBcInhsc3hcIiAsXG4gICAgICAgIFwicmVhY3QtaG9va3MtZ2xvYmFsLXN0YXRlXCIsXG4gICAgICAgIFwiQHN6aHNpbi9yZWFjdC1tZW51XCIgLFxuICAgICAgICBcImZpbGUtc2F2ZXJcIiAsXG4gICAgICAgIFwicmVhY3QtdG9hc3RpZnlcIiAsXG4gICAgICAgIFwicmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzc1wiICwgXG4gICAgICAgICdAZW1vdGlvbi9yZWFjdCcsXG4gICAgICAgICdAZW1vdGlvbi9zdHlsZWQnLFxuICAgICAgICAnQG11aS9sYWInLFxuICAgICAgICAnQG11aS9pY29ucy1tYXRlcmlhbCcsXG4gICAgICAgICdAbXVpL21hdGVyaWFsJyxcbiAgICAgICAgJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJyxcbiAgICAgICAgJ0BtdWkvc3R5bGVzJyxcbiAgICAgICAgJ3JlcXVpcmUnLFxuICAgICAgICAnY2hpbGRfcHJvY2VzcycsXG4gICAgICAgICdhZy1ncmlkLXJlYWN0JyxcbiAgICAgICAgJ0BzemhzaW4nLFxuICAgICAgICAnY2xzeCcgLFxuICAgICAgICAncHJpbWVyZWFjdCcgLFxuICAgICAgXSxcbiAgICAgIG91dHB1dCA6IHtcbiAgICAgICAgZ2xvYmFscyA6IHtcbiAgICAgICAgICByZWFjdCA6ICdSZWFjdCcsXG4gICAgICAgICAncmVhY3QtZG9tJyA6ICdSZWFjdERPTSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMk8sU0FBUyxvQkFBb0I7QUFDeFEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBSSxJQUFJLEVBQUMsYUFBYyxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQzlDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFZLE9BQU87QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVE7QUFBQSxJQUNOLFFBQVM7QUFBQSxJQUNULEtBQU07QUFBQSxNQUNKLE9BQVEsS0FBSyxRQUFRLGtDQUFZLDRCQUE0QjtBQUFBLE1BQzdELE1BQU87QUFBQSxNQUNQLFVBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxlQUFnQjtBQUFBLE1BQ2QsVUFBVztBQUFBLFFBQ1Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVM7QUFBQSxRQUNQLFNBQVU7QUFBQSxVQUNSLE9BQVE7QUFBQSxVQUNULGFBQWM7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
