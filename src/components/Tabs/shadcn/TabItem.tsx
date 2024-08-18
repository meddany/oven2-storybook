// @ts-nocheck
import React, { memo, useCallback, useRef } from 'react'
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { TabsTrigger } from '@/components/ui/tabs';

const vrs2 = cva('relative w-fit' , {
    variants : {
        outline : {
            true : 'active:outline active:outline-blue-500 active:outline-[3px] outline-offset-2'
        } ,
    } 
})

export const TabItem = (props) => {

    const { tab , onChange , index , outline , setDefaultTab , className={}  } = props;
    const ref = useRef()

    const hanldeChange = useCallback(() => {
        tab.ref=ref
        setDefaultTab(tab.value)
        onChange(tab,tab.value)
        if ( tab.onSelected ){
            tab.onSelected(tab)
        }
    } ,[tab,setDefaultTab])

    return (
        <TabsTrigger 
            ref={ref}
            className={cn(vrs2({outline}) , className ,"min-w-[100px] font-Roboto" )}
            key={index} 
            value={tab.value}
            children={tab.label}
            onClick={hanldeChange}
    />
  )
}

export default memo(TabItem)
