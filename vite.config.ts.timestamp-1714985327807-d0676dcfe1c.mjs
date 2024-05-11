// vite.config.ts
import { defineConfig } from "file:///E:/oven2-storybook/node_modules/vite/dist/node/index.js";
import react from "file:///E:/oven2-storybook/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import dts from "file:///E:/oven2-storybook/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\oven2-storybook";
var vite_config_default = defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/components/oven2/index.tsx"),
      name: "@easy_utils_dev/oven2",
      fileName: "oven2"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "xlsx",
        "react-hooks-global-state",
        "ag-grid-react",
        "@szhsin/react-menu",
        "file-saver",
        "xlsx",
        "react-toastify",
        "react-toastify/dist/ReactToastify.css",
        "@emotion/react",
        "@emotion/styled",
        "@mui/lab",
        "@mui/icons-material",
        "@mui/material",
        "@mui/material/styles",
        "@mui/styles"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxvdmVuMi1zdG9yeWJvb2tcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXG92ZW4yLXN0b3J5Ym9va1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovb3ZlbjItc3Rvcnlib29rL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpICwgZHRzKHtyb2xsdXBUeXBlcyA6IHRydWUgfSldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lICwgJy4vc3JjLycpXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQgOiB7XG4gICAgbWluaWZ5IDogZmFsc2UgLCBcbiAgICBsaWIgOiB7XG4gICAgICBlbnRyeSA6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUgLCAnLi9zcmMvY29tcG9uZW50cy9vdmVuMi9pbmRleC50c3gnKSxcbiAgICAgIG5hbWUgOiAnQGVhc3lfdXRpbHNfZGV2L292ZW4yJyxcbiAgICAgIGZpbGVOYW1lIDogICdvdmVuMidcbiAgICB9ICxcbiAgICByb2xsdXBPcHRpb25zIDoge1xuICAgICAgZXh0ZXJuYWwgOiBbXG4gICAgICAgICdyZWFjdCcsXG4gICAgICAgICdyZWFjdC1kb20nICxcbiAgICAgICAgXCJ4bHN4XCIgLFxuICAgICAgICBcInJlYWN0LWhvb2tzLWdsb2JhbC1zdGF0ZVwiLFxuICAgICAgICBcImFnLWdyaWQtcmVhY3RcIiAsXG4gICAgICAgIFwiQHN6aHNpbi9yZWFjdC1tZW51XCIgLFxuICAgICAgICBcImZpbGUtc2F2ZXJcIiAsXG4gICAgICAgIFwieGxzeFwiICxcbiAgICAgICAgXCJyZWFjdC10b2FzdGlmeVwiICxcbiAgICAgICAgXCJyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzXCIgLCBcbiAgICAgICAgJ0BlbW90aW9uL3JlYWN0JyxcbiAgICAgICAgJ0BlbW90aW9uL3N0eWxlZCcsXG4gICAgICAgICdAbXVpL2xhYicsXG4gICAgICAgICdAbXVpL2ljb25zLW1hdGVyaWFsJyxcbiAgICAgICAgJ0BtdWkvbWF0ZXJpYWwnLFxuICAgICAgICAnQG11aS9tYXRlcmlhbC9zdHlsZXMnLFxuICAgICAgICAnQG11aS9zdHlsZXMnLFxuXG4gICAgICBdLFxuICAgICAgb3V0cHV0IDoge1xuICAgICAgICBnbG9iYWxzIDoge1xuICAgICAgICAgIHJlYWN0IDogJ1JlYWN0JyxcbiAgICAgICAgICdyZWFjdC1kb20nIDogJ1JlYWN0RE9NJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0TyxTQUFTLG9CQUFvQjtBQUN6USxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFJLElBQUksRUFBQyxhQUFjLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDOUMsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVksUUFBUTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBUTtBQUFBLElBQ04sUUFBUztBQUFBLElBQ1QsS0FBTTtBQUFBLE1BQ0osT0FBUSxLQUFLLFFBQVEsa0NBQVksa0NBQWtDO0FBQUEsTUFDbkUsTUFBTztBQUFBLE1BQ1AsVUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLGVBQWdCO0FBQUEsTUFDZCxVQUFXO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUVGO0FBQUEsTUFDQSxRQUFTO0FBQUEsUUFDUCxTQUFVO0FBQUEsVUFDUixPQUFRO0FBQUEsVUFDVCxhQUFjO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
