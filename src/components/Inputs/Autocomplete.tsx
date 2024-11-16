// @ts-nocheck
import React, { useState , forwardRef, useEffect, useCallback, useRef } from 'react';
import { Input  } from '..';
import { cn } from '@/lib/utils';
import { InputProps } from './Input'
import $ from 'jquery';
import { Spinner } from '../../components/Spinner/Spinner'
import '../Containers/Sub_Components/ScrolBarStyle.css'
import { CheckIcon } from '..';
import { 
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../ui/popover"

  
export interface AutocompeleteProps extends InputProps {
    onChange? : void 
    options? : object ,
    defaultValue? : string ,
    value?: string ,
    onClick : void ,
    onLoad : void ,
    search : boolean ,
    className:string ,
    placeholder : string,
    autoScroll : boolean ,
    type: string
}

export const AutoComplete = forwardRef<HTMLInputElement , AutocompeleteProps>((props,ref) =>{
    
    const { 
        options=[] , 
        onChange=()=>{} , 
        defaultValue=null ,
        value=null,
        search=true,
        className='',
        placeholder='' ,
        autoScroll=true,
        nested=false ,
        loading=true,
        type,
        accessKey='label',
        autoHideLoading=true,
        tmpdescription={},
    } = props;

    const [ defaultHasLoaded , setDefaultHasLoaded ] = useState(false)
    const [ unControlledValue , setUncontrolledValue ] = useState('')
    const [open, setOpen] = React.useState(false)
    const [ boxWidth , setBoxWidth ] = useState(250)
    const [ spinLoading , setSpinLoading ] = useState(loading)
    const wRef= useRef()


    useEffect( () => {
        if ( ! defaultHasLoaded ){
            if ( defaultValue ){
                setUncontrolledValue(defaultValue)
            }
            setDefaultHasLoaded(true)
        }
        if ( value ){
            setUncontrolledValue(value)
        }
    } , [ defaultValue,value])

    useEffect( () => {
        if ( wRef.current ){
            setBoxWidth($(wRef.current).width())
        }
    } , [wRef])

    const onChangeEvent = useCallback( (v , object ) => {
        if ( ! value ){
            setUncontrolledValue(v)
            if ( ref?.current ){
                ref.current.value = v
            }
        }
        wRef.props = props
        onChange(wRef, v , object)
    } , [options])

    const scrollToView= useCallback( () => {
        if ( unControlledValue ){
            setTimeout( () => {
                const element = $(".__"+unControlledValue).get(0)
                if ( element ){
                    element.scrollIntoView({ behavior: 'smooth' , block: 'center', inline: 'nearest'});
                }
            } , 250)
        }
    } , [unControlledValue])

    useEffect( () => {
        if ( options  && autoHideLoading ){
            if ( options.length > 0){
                setSpinLoading(false)
            }
        }
    } , [options , autoHideLoading ])

    return (
        <div ref={wRef} className={cn('w-full h-full relative z-[20]' , className )}>
            <Popover open={open} onOpenChange={setOpen} className='w-full'>
                <PopoverTrigger asChild>
                    <Input 
                        {...props}
                        options={'data-options'}
                        ref={ref}
                        value={unControlledValue}
                        onChange={ onChangeEvent }
                        placeholder={placeholder}
                        onClick={autoScroll ? scrollToView : () => {}}
                        type={type ? 'auto-complete' : 'select'}
                        readOnly={type == 'select' ? true : false }
                        tmpdescription={tmpdescription}
                        loading={spinLoading.toString()}
                        className='w-full'
                    />
                </PopoverTrigger>
                <PopoverContent className='p-[5px] z-[301]' style={{width : boxWidth+"px"}} >
                    <Command>
                        {
                            search ? <CommandInput placeholder="Search..." className='w-full text-accent-foreground font-geist'/> : null
                        }
                    <CommandList>
                        <CommandEmpty>{loading ? <div className='w-full h-full flex justify-items-center'><Spinner /></div> :"No result." }</CommandEmpty>
                        <CommandGroup className='!custom-scroll-bar1'>
                            {
                                options.map( (item,index) => {
                                    const oItem = nested ? item : { label : item }
                                    const label = oItem[accessKey]
                                    const isSelected = unControlledValue == label ? true : false 
                                    return(
                                        <CommandItem
                                            key={index}
                                            data-id={"__"+label}
                                            className={cn( `__${label} `+
                                                'my-[5px] transition-all ease-in-out duration-75 w-[calc(100%-0px)] h-[25px] z-[300] font-geist rounded-full pt-[10px] hover:outline-[2px] hover:outline-blue-500 ' , 
                                                isSelected ? 'outline-[2px] outline-accent text-black px-2' : null
                                            )}
                                            value={label}
                                            children={
                                                isSelected ? 
                                                <div className='space-x-2 flex items-center justify-center'>
                                                    <div className='rounded-3xl bg-accenttext-blue-500 w-[20px] aspect-square flex items-center justify-center'>
                                                        <CheckIcon size={14} />
                                                    </div>
                                                    <label>{ label }</label>
                                                </div> 
                                                : 
                                                <label>{ label }</label>
                                            }
                                            onSelect={(currentValue) => {
                                                onChangeEvent(currentValue , item )
                                                setOpen(false)
                                            }}
                                        />
                                    )
                                })
                                    
                            }
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
                </Popover>
        </div>
    );
})