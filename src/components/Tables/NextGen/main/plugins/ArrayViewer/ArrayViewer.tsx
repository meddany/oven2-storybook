// @ts-nocheck
import { forwardRef, useEffect , useRef, useState } from "react";
import { CopyButton } from "@/components/Buttons/CopyButton";

export interface ArrayViewerProps {
    header : string
}

export const ArrayViewer= forwardRef<HTMLAreaElement , ArrayViewerProps>( (props,ref2) => {
    
    const { 
        viewAsArray=[],
        cell={},
        callback
     } = props;


    function updateDetailsSection(rows){
        const rowNode = callback?.gridRef.api.getSelectedNodes()
        callback.updateSingleCallbackKey('lastRowNode' , rowNode )
        if ( callback.lastRowNode){
            callback?.gridRef?.api?.getDisplayedRowAtIndex(callback?.lastRowNode[0]['rowIndex']).setExpanded(false)
        }
        callback.updateSingleCallbackKey('expandedDetailsContent' , {
            ...props , 
            content : 
                <div className="w-full h-fit max-h-[50vh] overflow-auto px-2 space-y-1 relative ">
                    {
                        rows?.map( (row,index) => {
                            return(
                                <div className="rounded border px-1 py-2 font-Roboto hover:bg-accent flex relative [&_.cssu7hg]:hover:visible">
                                    <div className="w-full text-[18px] truncate text-wrap px-4" key={index}>{row}</div>
                                    <CopyButton outline={false} value={row} className={'cssu7hg invisible w-[20px] h-[20px] relative right-4'}/>
                                </div>

                                
                            )
                        })
                    }

                </div>
        } )
        callback?.gridRef?.api?.getDisplayedRowAtIndex(rowNode[0]['rowIndex']).setExpanded(true)
    }

    function clearLastRowIExpand(){
        if ( callback.lastRowNode){
            callback?.gridRef?.api?.getDisplayedRowAtIndex(callback?.lastRowNode[0]['rowIndex']).setExpanded(false)
        }
    }

    useEffect( () => {
        if ( cell.value ){
            if ( viewAsArray.includes(cell.header)){
                if ( Array.isArray( cell ) ){
                    if ( cell.value.length == 0){
                        return
                    }
                    updateDetailsSection(cell.values)
                }
                else if( cell?.toString().at(0) == '[' && cell.toString().at(-1) == ']' ){
                    try{
                        const data = JSON.parse(cell.value )
                        if ( data.length == 0){
                            return
                        }
                        updateDetailsSection(data)
                    }
                    catch(error){
                        console.warn('maybe bug, cell.value didnt JSON.Parse ' , error)
                    }
                    
                }
                else{
                    clearLastRowIExpand(null)
                }
            }
            else{
                clearLastRowIExpand(null)
            }
        }
    } , [cell.value])

    return(
        <></>
    )
} )