
// @ts-nocheck
import React, { useCallback, useEffect , useState } from 'react'
import { Rows4 , FoldHorizontal , Download , Grid2x2CheckIcon} from 'lucide-react'
import CsvIcon from '../src/CSV.png'
import ExcelIcon from '../src/excell.png'

export const useTablePreferencesMenu = (callback , changeRowHeight ) => {
  const [ items , setItems ] = useState([])
  useEffect( () => {
    if ( callback.ready){
        setItems([
            {
                label : "Change Rows Height" ,
                type : 'default' ,
                size : 'sm' ,
                icon: <Rows4 className='text-blue-600' /> ,
                action : () => {
                    const oldSizeAsString= callback.rowHeightStr
                    const newSize = oldSizeAsString == 'sm' ? 'mid' : 'sm'
                    changeRowHeight(newSize)
                }
            },
            {
                label : "Autofit Columns" ,
                type : 'default' ,
                size : 'sm' ,
                icon: <FoldHorizontal className='text-blue-600' /> ,
                action : () => {
                    callback.autoFit(false)
                }
            },
            {
                label : "Columns Panel" ,
                type : 'default' ,
                size : 'sm' ,
                icon: <Grid2x2CheckIcon className='text-blue-600' /> ,
                action : () => {
                    callback.PanelDialogRef.current.open()
                }
            },
            {
                label : "Export" ,
                type : 'default' ,
                size : 'sm' ,
                icon: <Download className='text-blue-600' /> ,
                subItems: [
                    {
                        label : 'Export CSV' ,
                        type : 'default' , 
                        size : 'sm' ,
                        icon: <img src={CsvIcon} alt='23' />,
                        action : () => { callback.exportAsCsv()}
                    },
                    {
                        label : 'Export Excel' ,
                        type : 'default' , 
                        size : 'sm' ,
                        icon: <img src={ExcelIcon} alt='23' />,
                        action : () => {
                            callback.exportAsExcel(callback)
                        }
                    }
                ]
            }
        ])
    }
  } , [callback.ready])


  return [ items ]
}

