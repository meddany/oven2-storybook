// @ts-nocheck
import { useState,useEffect, useCallback  } from "react"
import copy from 'copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const useTableMenu = (callback,menuItems=[],cell={}) => {

    const [ items , setItems ] = useState([])

    const parseIt = useCallback((data) => {
        data.map( item => {
            const f = item.action
            item.action= function(){
                f(callback , callback.getSelectedRows())
            }
        })
        return menuItems
    } , [cell.value])


    useEffect( () => {
        if ( cell.value ){
            const nitems = parseIt(menuItems)
            setItems( prev => ([
                {
                    label : 'Copy' ,
                    pinned : true ,
                    icon: <ContentCopyIcon fontSize="14px" />,
                    action: () => {
                        copy(cell.value.toString())
                    } 
                } ,
                ...nitems
            ]
            ))
        }
    } , [cell.value] )


    return [ items , setItems ]
    
}