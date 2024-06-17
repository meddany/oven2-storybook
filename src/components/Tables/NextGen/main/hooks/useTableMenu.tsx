// @ts-nocheck
import { useState,useEffect, useCallback  } from "react"
import { CopyIcon } from "lucide-react"
import copy from 'copy-to-clipboard'

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
    } , [callback ,menuItems])


    useEffect( () => {
        if (callback.ready ){
            const nitems = parseIt(menuItems)
            setItems( prev => ([
                {
                    label : 'Copy' ,
                    pinned : true ,
                    icon: <CopyIcon />,
                    action: () => {
                        copy(callback.selectedCell)
                    } 
                } ,
                ...nitems
            ]
            ))
        }
    } , [callback,menuItems] )


    return [ items , setItems ]
    
}