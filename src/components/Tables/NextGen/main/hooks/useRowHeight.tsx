// @ts-nocheck
import { useCallback, useEffect, useState } from "react"


export const useRowHeight = (rowHeigh,updateCallback) => {
    const [ height , setHeight ] = useState(30)

    const updater = useCallback( (HeightStr : string) => {
        if ( HeightStr == 'sm' ) { setHeight(30) }
        else if ( HeightStr == 'mid' ) { setHeight(40) }
        else if ( HeightStr == 'lg' ) { setHeight(50) }
        else { setHeight(30) }
        updateCallback( prev => ({...prev , rowHeightInt : height , rowHeightStr : HeightStr }))
    } , [rowHeigh])


    useEffect( () => { 
        updater( rowHeigh )
    } , [rowHeigh])

    return [ height , updater ]
}