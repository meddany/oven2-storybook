// @ts-nocheck

import { forwardRef, useEffect, useRef,useState } from "react";
import { Tabs , TabsList , TabsContent } from '../../ui/tabs'
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useRandomId } from "@/components/utils/utils";
import TabItem from "./TabItem";

const vrs = cva('relative ' , {
    variants : {
        variant : {

        } ,
        size : {
            full : 'w-full h-full'
        } ,
    } 
})
const vrs2 = cva('relative' , {
    variants : {
        outline : {
            true : 'active:outline active:outline-blue-500 active:outline-[3px] outline-offset-2'
        } ,
    } 
})

export const ShadcnTabs = forwardRef( (props,ref) => {
    const [ defaultTab , setDefaultTab ] = useState(undefined)

    const {
        tabs=[] ,
        onChange=() => {},
        className={},
        size='full',
        body=true,
        outline=false,
        center=false ,
    }  = props


    
    useEffect( () => {
        tabs.map( tab => {
            if ( tab.default ){
                setDefaultTab(tab.value)
            }
        })
    } , [tabs])

    return(
        <Tabs ref={ref} value={defaultTab} className={cn(vrs({size}) , className)} >
            <div className={cn(center ? "flex justify-start" : "flex")}>
                <TabsList className="h-fit py-1 w-full justify-start flex-wrap">
                    {
                        tabs.map( (tab,index) => {
                            return(
                                <TabItem  key={tab.value || useRandomId()} setDefaultTab={setDefaultTab} defaultTab={defaultTab} outline={outline} tab={tab} index={index} onChange={onChange} />
                            )
                        })
                    }
                
                </TabsList>
            </div>
            {
                    body ? 
                    <div className="w-full h-full relative border-solid border border-gray-200 p-1 rounded bg-[#fafafa]">
                    {
                        tabs.map( (tab) => {
                            const id = useRandomId()
                            tab.tabs = tabs
                            tab.props= props
                            return(
                                <TabsContent key={"__"+tab.value || useRandomId()} id={id} value={tab.value} className="m-0 p-0">
                                    {tab.content}
                                </TabsContent>
                            )
                        })
                    }
                </div>
                : null
            }
        </Tabs>
    )
})