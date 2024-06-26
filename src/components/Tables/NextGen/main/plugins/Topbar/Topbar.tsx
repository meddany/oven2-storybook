// @ts-nocheck
import { useCallback, useContext, useEffect, useState } from "react"
import { TableContext } from "../../main"
import { IconButton } from "../../../../../Buttons/IconButton"
import { LucideEllipsisVertical , FoldHorizontal , Fullscreen ,Download  , RotateCw  } from "lucide-react"
import { hotkeyRegister , clearHotkeyRegister } from "@/components/utils/hotkeyregister"
import $ from 'jquery'

export const Topbar = (props) => {
    const { updateCallback , updateEvent ,toolbarBtns=[]  } = props
    const { callback } = useContext(TableContext)
    const [ tableName , setTableName ] = useState()
    const [ isRefreshDisabled , setIsRefreshDisabled ]  = useState(false)

    useEffect( () => {
        if ( callback.props ){
            setTableName( callback.props.tableName )
            callback.props.onRefresh ? setIsRefreshDisabled(false) : setIsRefreshDisabled(true)
        }
    } , [callback])

    const switchFullscreen = useCallback( () => {
        console.log('escape button clicked to exit full screen mode ...' , callback )
        $(callback.tableRef.current).toggleClass('css-771-full-screen')
        updateCallback( prev => ({...prev , fullscreen : false  }))
    } , [callback])

    useEffect( () => {
        hotkeyRegister('escape' , () => {
            switchFullscreen()
        })
        return () => {
            clearHotkeyRegister('escape')
            updateCallback( prev => ({...prev , fullscreen : false  }))
        }
    } , [callback.fullscreen])

    return (
        <div className="flex items-center h-auto w-full css-klk212 p-1">
            <div className="select-none font-geist text-nowrap w-full" >
                {tableName}
            </div>

            <div className="flex items-center space-x-2 mr-1 p-1">
                {
                    toolbarBtns.map( item => {
                        return item
                    })
                }
                <IconButton 
                    icon={<RotateCw />}
                    tooltip='Refresh'
                    disable={isRefreshDisabled}
                    onClick={() => {callback.onRefreshTrigger(callback)}}
                />

                <IconButton 
                    icon={<Fullscreen />}
                    tooltip='Fullscreen'
                    onClick={() => {
                        $(callback.tableRef.current).toggleClass('css-771-full-screen')
                        updateCallback( prev => ({...prev , fullscreen : !callback.fullscreen  }))
                    }}
                />

                

                <IconButton 
                    icon={<FoldHorizontal />}
                    tooltip='Autofit columns'
                    onClick={() => {
                        callback.autoFit(false)
                    }}
                />

                <IconButton 
                    icon={<Download />}
                    tooltip='Export(CSV)'
                    onClick={() => {
                        callback.exportAsCsv()
                    }}
                />

                <IconButton 
                    icon={<LucideEllipsisVertical />}
                    tooltip='Show more options'
                    onClick={(e)=>{
                        updateEvent(e)
                    }}
                />

            </div>
        </div>
    )
}