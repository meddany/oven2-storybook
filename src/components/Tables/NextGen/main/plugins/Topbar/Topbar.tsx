// @ts-nocheck
import { useCallback, useContext, useEffect, useState } from "react"
import { TableContext } from "../../main"
import { IconButton } from "../../../../../Buttons/IconButton"
import { LucideEllipsisVertical , FoldHorizontal ,FilterX , Fullscreen ,Download  , RotateCw  } from "lucide-react"
import { hotkeyRegister , clearHotkeyRegister } from "@/components/utils/hotkeyregister"
import $ from 'jquery'
import { SubHeader } from "@/components/Paragraph/Headlines/Headline/MainHeader"

export const Topbar = (props) => {
    const { 
        updateCallback , 
        updateEvent ,
        toolbarBtns=[] ,
        onRefresh=() => {} ,
        cell={}
    } = props
    const { callback , 
        gridRef , 
        setFilterItems ,
        isFilterApplied } = useContext(TableContext)
    const [ tableName , setTableName ] = useState()
    const [ isRefreshDisabled , setIsRefreshDisabled ]  = useState(false)

    useEffect( () => {
        if ( callback.props ){
            setTableName( callback.props.tableName )
            callback.props.onRefresh ? setIsRefreshDisabled(false) : setIsRefreshDisabled(true)
        }
    } , [callback.cell?.value])

    const switchFullscreen = useCallback( () => {
        $(callback.tableRef.current).toggleClass('css-771-full-screen')
        updateCallback( prev => ({...prev , fullscreen : false  }))
    } , [callback.fullscreen])


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
        <div className="flex items-center w-full css-klk212 border-b p-2 overflow-hidden h-[55px]">
            <div className="select-none font-Roboto flex w-[calc(100%)-80px]" >
                <span className="text-black text-nowrap border-r mr-4 pr-2 ">
                    {tableName}
                </span>
                <div className="select-none font-Roboto text-black text-nowrap w-full flex" >
                    <SubHeader  title={cell.value} className='capitalize'>{cell.header ? cell.header + " : " : ''}</SubHeader>
                    <div className=" max-w-[300px] z-0 ml-2 text-gray-600 truncate" title={cell.value}>
                        <SubHeader className='capitaliz'>{cell.value ? cell.value : ''}</SubHeader>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 mr-1 p-1 border-l absolute right-0 css-klk212 z-10">
                {
                    isFilterApplied ? 
                        <IconButton 
                            icon={<FilterX color='gray' />}
                            tooltip='Clear all filters.'
                            onClick={()=>{
                                setFilterItems(prev => {
                                    prev.row.map( item => {
                                        item.view = true
                                    })
                                    return prev
                                })
                                gridRef.current.api.setFilterModel(null)
                            }}
                        /> 
                    :
                        null
                }
                {
                    toolbarBtns.map( item => {
                        return item
                    })
                }
                <IconButton 
                    icon={<RotateCw />}
                    tooltip='Refresh'
                    disable={isRefreshDisabled}
                    onClick={() => {onRefresh(callback)}}
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