/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef , useState , useEffect , useCallback } from 'react'
import {Card , CardHeader ,  CardTitle, CardDescription , CardContent  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {  EyeOff , Eye    } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRef } from 'react';
import { cva } from 'class-variance-authority';
import { PanelFooter } from './Sub_Components/PanelFooter'
import { PanelHeader } from './Sub_Components/PanelHeader'
import { InlineSpinner } from '../Spinner/InlineSpinner';
import { MainHeader } from '../Paragraph/Headlines/Headline/MainHeader';
import $ from 'jquery'
import { cn } from '@/lib/utils';

const vrs = cva(
    "bg-muted h-full w-full relative" ,
    {
        variants : {
            variant : {
                dialog : 'hidden'
            }
        }
    }
)
const vrsPanel = cva(
    "relative bg-background border-border rounded-lg p-0" ,
    {

    }
)

export interface PanelProps {
    children : any , 
    closeButton : boolean , 
    header : string, 
    moreInfo : string, 
    spinnerArgs : object , 
    spinnerState : any,
    className?:string ,
    defaultClose : string
}



export const Panel = forwardRef<PanelProps>( (props, ref ) => {
    
    const { children , closeButton='icon' , header, moreInfo ,spinnerArgs , spinnerState , shortInfo , footer , collapsable, variant , defaultClosed , className } = props;
    const panelRef = useRef()
    const [ iconsOrder , setIconOrder ] = useState([<Eye size={16} /> , <EyeOff size={16} />])
    const [ tooltipOrder , setTooltipOrder ] = useState([])
    const spinnerRef = useRef({})

    const handleViewHideEye = useCallback( () => {
        if (defaultClosed){
            $(panelRef.current).find('.css-i231').hide()
            setIconOrder( [<EyeOff size={16} /> , <Eye size={16} />  ])
            setTooltipOrder( ['Hide' , 'Show'  ])
        }
        else if (!defaultClosed){
            $(panelRef.current).find('.css-i231').show()
            setIconOrder( [<Eye size={16} /> , <EyeOff size={16} /> ])
            setTooltipOrder( ['Show' , 'Hide'])
        }
    } , [defaultClosed])


    useEffect(()=>{
        handleViewHideEye()
    } , [defaultClosed])


    return (
        <Card ref={panelRef} className={cn(vrsPanel({}) , className )} >
                <div className='flex items-center min-h-[60px] p-4 py-3'>
                    <CardTitle className='relative w-full' >
                        <MainHeader>{ header }</MainHeader>
                        { shortInfo ? <CardDescription className='font-geistlight font-medium' >{shortInfo}</CardDescription> : null }
                    </CardTitle>
                    <PanelHeader ref={panelRef} moreInfo={moreInfo} collapsable={collapsable} vrs={vrs} variant={variant} close={closeButton} iconsOrder={iconsOrder} tooltipOrder={tooltipOrder} />
                </div>
                <div className='css-i231' ></div>
                <Separator className={'css-i231'} />
            <CardContent className='css-i231 overflow-y-hidden p-2'>
                <ScrollArea className={`h-[calc(100%-200px)] w-full px-[10px] relative` }>
                    {children}
                    <InlineSpinner {...spinnerArgs || {}} defaultOpen={spinnerState} ref={spinnerRef} />
                </ScrollArea>
            </CardContent>
            <PanelFooter footer={footer} close={closeButton} />
        </Card>
      )
})