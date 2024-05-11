import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills({ include: ['fs', 'child_process'] }) ,react() , dts({rollupTypes : true })],
  resolve: {
    alias: {
        '@': path.resolve(__dirname , './src/') ,
        child_process: 'rollup-plugin-node-polyfills/polyfills/child_process',
    },
  },
  build : {
    minify : false , 
    lib : {
      entry : path.resolve(__dirname , './src/components/oven2/index.tsx'),
      name : '@easy_utils_dev/oven2',
      fileName :  'oven2'
    } ,
    rollupOptions : {
      external : [
        'react',
        'react-dom' ,
        "xlsx" ,
        "react-hooks-global-state",
        "ag-grid-react" ,
        "@szhsin/react-menu" ,
        "file-saver" ,
        "xlsx" ,
        "react-toastify" ,
        "react-toastify/dist/ReactToastify.css" , 
        '@emotion/react',
        '@emotion/styled',
        '@mui/lab',
        '@mui/icons-material',
        '@mui/material',
        '@mui/material/styles',
        '@mui/styles',
        'require',
        'child_process'

      ],
      output : {
        globals : {
          react : 'React',
         'react-dom' : 'ReactDOM'
        }
      }
    }
  }
})
