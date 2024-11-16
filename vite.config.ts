import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , dts({rollupTypes : true })],
  resolve: {
    alias: {
        '@': path.resolve(__dirname , './src') ,
    },
  },
  build : {
    minify : false , 
    lib : {
      entry : path.resolve(__dirname , './src/components/index.tsx'),
      name : '@nextgen/react',
      fileName :  'nextgen'
    } ,
    rollupOptions : {
      external : [
        'react',
        'react-dom' ,
        "xlsx" ,
        "react-hooks-global-state",
        "@szhsin/react-menu" ,
        "file-saver" ,
        "react-toastify" ,
        "react-toastify/dist/ReactToastify.css" , 
        '@emotion/react',
        '@mui/lab',
        '@mui/icons-material',
        '@mui/material',
        '@mui/material/styles',
        '@mui/styles',
        'require',
        'child_process',
        'ag-grid-react',
        '@szhsin',
        'clsx' ,
        'primereact' ,
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
