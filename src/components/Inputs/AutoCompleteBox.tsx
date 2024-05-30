// @ts-nocheck
import React, { forwardRef , useEffect, useState } from 'react'
import { 
    CommandList ,
    CommandEmpty ,
    CommandItem ,
    CommandGroup ,
    Command 
} from '../ui/command'
import { ScrollArea } from '../Containers/ScrollArea'

export const AutoCompleteBox = forwardRef( (props, ref) => {

    const { defaultItems, open } = props
    const [items , setItems ] = useState(defaultItems||[])
    const [ isOpen , setOpen ] = useState(open||false)

    useEffect( () => {
        setOpen(open)
    } , [open])

    return (
        <Command > 
            {
                isOpen ? 
                <CommandList >
                    <CommandEmpty>No frequency Selected.</CommandEmpty>
                    <CommandGroup heading="Frequencies - 6.25 Granularity">
                        <ScrollArea className={'w-full max-h-[100%]'} >
                            {
                                items.map( (item,index) => {
                                    return <CommandItem key={index} >{item}</CommandItem>

                                })
                            }
                        </ScrollArea>
                    </CommandGroup>
                </CommandList> 
                : null
            }
        </Command>
    )
})