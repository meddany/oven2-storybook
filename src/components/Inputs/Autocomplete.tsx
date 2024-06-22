// @ts-nocheck
import React, { useState , forwardRef, useEffect, useCallback, useRef } from 'react';
import { Input  } from '..';
import { cn } from '@/lib/utils';
import { InputProps } from './Input'
import $ from 'jquery'
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
    onSelectChange? : void 
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
        onSelectChange=()=>{} , 
        defaultValue=null ,
        value=null,
        search=true,
        className='',
        placeholder='' ,
        autoScroll=true,
        type
    } = props;

    const [ defaultHasLoaded , setDefaultHasLoaded ] = useState(false)
    const [ unControlledValue , setUncontrolledValue ] = useState('')
    const [open, setOpen] = React.useState(false)
    const [ boxWidth , setBoxWidth ] = useState(250)
    const [ listProp , setListProp ] = useState({})
    
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

    const onChangeEvent = useCallback( (v) => {
        if ( ! value ){
            setUncontrolledValue(v)
        }
        onSelectChange(wRef,v)
    } , [])

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


    return (
        <div ref={wRef} className={cn('w-full h-full relative z-[2000]' , className )}>
            <Popover open={open} onOpenChange={setOpen} className='w-full'>
                <PopoverTrigger asChild>
                    <Input 
                        {...props}
                        options={'data-options'}
                        inputRef={ref}
                        value={unControlledValue}
                        onChange={ onChangeEvent }
                        placeholder={placeholder}
                        onClick={autoScroll ? scrollToView : () => {}}
                        type={type ? 'auto-complete' : 'select'}
                        readOnly={type == 'select' ? true : false }
                    />
                </PopoverTrigger>
                <PopoverContent className='p-2 z-[2000]' style={{width : boxWidth+"px"}} >
                    <Command>
                        {
                            search ? <CommandInput placeholder="Search..." className='w-full text-accent-foreground font-geist'/> : null
                        }
                    <CommandList>
                        <CommandEmpty>No result.</CommandEmpty>
                        <CommandGroup>
                            {
                                options.map( (item,index) => {
                                    const isSelected = unControlledValue == item ? true : false 
                                    return(
                                        <CommandItem
                                            key={index}
                                            data-id={"__"+item}
                                            className={cn( `__${item} `+
                                                'my-[3px] transition-all ease-in-out duration-75 w-[calc(100%-0px)] rounded-[0px] z-[400]  font-geist hover:outline-[2px] hover:outline-blue-500 ' , 
                                                isSelected ? 'outline-[2px] outline-accent text-black px-2' : null
                                            )}
                                            value={item}
                                            children={
                                                isSelected ? 
                                                <div className='space-x-2 flex items-center justify-center'>
                                                    <div className='rounded-3xl bg-accenttext-blue-500 w-[20px] aspect-square flex items-center justify-center'>
                                                        <CheckIcon size={14} />
                                                    </div>
                                                    <label>{ item }</label>
                                                </div> 
                                                : 
                                                <label>{ item }</label>
                                            }
                                            onSelect={(currentValue) => {
                                                onChangeEvent(currentValue)
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