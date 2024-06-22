// @ts-nocheck
import { useState,useEffect, useCallback  } from "react"
import { CopyIcon } from "lucide-react"
import copy from 'copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const useTableMenu = (callback,menuItems=[]) => {

    const [ items , setItems ] = useState([])

    const parseIt = useCallback((data) => {
        data.map( item => {
            const f = item.action
            item.action= function(){
                f(callback , callback.getSelectedRows())
            }
        })
        return menuItems
    } , [callback.ready ,menuItems])


    useEffect( () => {
        if (callback.ready ){
            const nitems = parseIt(menuItems)
            setItems( prev => ([
                {
                    label : 'Copy' ,
                    pinned : true ,
                    icon: <ContentCopyIcon fontSize="14px" />,
                    action: () => {
                        copy(callback.selectedCell)
                    } 
                } ,
                ...nitems
            ]
            ))
        }
    } , [callback.ready ,menuItems] )


    return [ items , setItems ]
    
}