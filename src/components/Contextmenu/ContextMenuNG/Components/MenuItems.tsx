// @ts-nocheck
import React, { forwardRef, useEffect, useMemo , useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Separator } from "../../../ui/separator"
import { ChevronRight , Check  } from 'lucide-react';
import { IconButton } from '../../../Buttons/IconButton';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { Switch } from '../../../Buttons/Switch'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../ui/accordion"


const vrs = cva(    
    'w-full relative rounded-[3px] flex pl-8 pr-2 items-center baseline-item-menu br-1 font-geist text-sm transition-all duration-150 ease-in-out' ,
    {
        variants : {
            size : {
                sm : 'h-[30px]' ,
                mid : 'h-[35px]' ,
                lg : 'h-[40px]' ,
                auto : 'h-auto' ,
            } ,
            hover : {
                true : 'hover:bg-accent' ,
            },
            disabled : {
                true : 'opacity-50 hover:bg-transparent cursor-not-allowed' ,
            },
            danger : {
                true : 'text-destructive hover:bg-destructive-foreground hover:text-accent' ,
            },
            border : {
                sm : "rounded-[1px]",
                mid : "rounded",
                lg : "rounded-[10px]",
                xlg : "rounded-[15px]",
            }
        } ,
        defaultVariants : {
            size : 'auto' ,
            hover : true
        }
    }
)

const PrimaryMenuItem = forwardRef( (props, ref ) => {
    const { seperator, danger , onChange , item , custom , border ,subItems, size , onClick ,  shortcut ,onExit , disabled , onHover ,type , label , className } = props;
    const [delayHandler, setDelayHandler] = useState(null)
    const [ cicon  , setCicon ] = useState(null)
    function isOkHover(){
        return ['default' , 'checkbox' , 'switch' , 'accordion'].includes(type ) ? true : false
    }
    function handleOnMouseClick(e){
        if ( onChange ){
            if ( item.defaultChecked==undefined ){
                item.defaultChecked=false
            }
            const s = item.defaultChecked == true ? false : true
            onChange(e,item,s)
        }
        if (['switch' , 'accordion'].includes(type)){
            return
        }

        if ( onClick){
            onClick(e,item)
        }
    }

    useEffect( () => {
        if ( item.type == 'checkbox'){
            if( item.checked ){
                setCicon(<Check />)
            }
        }
        if ( item.icon ){
            setCicon(item.icon)
        }
    } , [item])

    const handleOnMouseEnter=(e) => {
        setDelayHandler(setTimeout(() => {
            onHover ? onHover(e,item) : null
        }, 200))
    }

    const handleOnMouseLeave=(e) => {
        clearTimeout(delayHandler)
        onExit ? onExit(e) : null
    }

    const handleSwitchStateChange = (v) => {
        if ( item.onChange ){
            item.onChange(v)
        }
    }

    return (
        <>
            <div onMouseLeave={handleOnMouseLeave} onClick={handleOnMouseClick} onMouseEnter={handleOnMouseEnter} className={cn(vrs({size , disabled , danger , border ,hover : isOkHover() }) , className )}>
                <div className='pointer-events-none -translate-x-6 absolute w-[15px] h-[15px] flex justify-center items-center' >
                    { cicon ? cicon : null }
                </div>
                { !custom ? <p className='text-nowrap pointer-events-none select-none mr-4'>{capitalizeFirstLetter(label)}</p> : null }
                
                {custom ? custom : null }
                { shortcut && ! subItems  ? <p className='ml-auto pointer-events-none select-none text-xs tracking-widest text-muted-foreground'>{shortcut.toUpperCase()}</p> : null }
                { item.type == 'switch' ? <div className='ml-auto pointer-events-auto'> <Switch disabled={item.disabled} defaultChecked={item.defaultChecked} onCheckedChange={(v)=>{item.checked=v ; handleSwitchStateChange(v) }} /> </div>  : null }
                { subItems  ? <ChevronRight size={16}  className='ml-auto pointer-events-none' /> : null }
            </div>
            { seperator  ? <Separator /> : null }
        </>

    )
})

export const MenuItem = forwardRef( (props , ref ) => {
    const { type ,item , pinned  }  = props 
    if ( type == 'default'){
        return <PrimaryMenuItem {...props} />
    }
    else if ( pinned ){
        return <PinnedMenuItem {...props} />
    }
    else if ( type == 'checkbox' ){
        if ( item.defaultChecked ){
            item.checked = true 
        }
        return <PrimaryMenuItem {...props} />
    }
    else if ( type == 'switch' ){
        return <PrimaryMenuItem {...props} />
    }
    else if ( type == 'radiogroup' ){
        return <RadioGroup pprops={props} itemgp={item} />
    }
    else if ( type == 'accordion' ){
        return <PrimaryMenuItem {...props} size='auto' custom={<AccordionBox {...props} />} />
    }

} )

export const PinnedMenuItem = forwardRef( (props, ref ) => {
    const {  border , className , onClick , items } = props;

    const m = useMemo( () => {
        return cn(vrs( { 
            size :'lg',
            border ,
            hover: false,
        } ) , 'pl-1 pr-1 rounded-[2px] justify-start items-center ' , className )
    } , [])
    
    return (
        <>
            {
                items.length > 0 ?
                <>
                    <div className={m} >
                    {
                        items.map( (item,index) => {
                            return(
                                <IconButton 
                                    key={index}
                                    tooltip={item.label}
                                    icon={item.icon}
                                    className='ml-2'
                                    onClick={(e)=>{onClick(e,item)}}
                                />
                            )
                        } )
                    }
                    </div>
                    <Separator className='my-[5px]' />
                </>
            : null
            }
        </>
    )
})

const AccordionBox = forwardRef( (props, ref ) => {
    return (
        <Accordion defaultValue={props.item.defaultOpen ? "item-1" : ""} disabled={props.item.disabled} className='font-geist  p-0 m-0' type="single" collapsible className="w-full">
            <AccordionItem className={'font-geist  p-0 m-0'} value="item-1">
                <AccordionTrigger >{props.label}</AccordionTrigger>
                <AccordionContent >
                    {props.item.content}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )

})

const RadioGroup = forwardRef((props, ref ) => {
    const { itemgp , pprops } = props;
    return (
        <>
            <Separator />
            {
                itemgp.group.map((item,index) => {
                    const t = {...item , 
                        ...itemgp , 
                        ...pprops,
                        type : 'checkbox' ,
                        checked : item.defaultChecked ? true : false ,
                        label : item.label
                    }
                    return <PrimaryMenuItem key={index} {...t} item={t} type='checkbox' />
                })
            }
            <Separator />
        </>
    )
})