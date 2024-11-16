// @ts-nocheck
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '..';
import { IconButton } from '..';
import {ChevronDown} from 'lucide-react'
import { ContextMenu } from '..';


export const SplitButton = (props) => {
    const [ event , setEvent ] = useState(null)
    const [ location , setLocation ] = useState({x:0,y:0})
    const ref = useRef()
    const {
        className,
        children ,
        split=true ,
        menuHeader,
        disabled=false,
        menuItems=[],
        onClick=()=>{},
        buttonProps={
            variant:'primary'
        },
        iconProps={
            outline : false,
            variant:'primary'
        }
    } = props;

    return (
        <div ref={ref} className={cn('relative flex items-center h-[35px] overflow-hidden' , className )}>
            <Button {...buttonProps} disable={disabled} className='relative' onClick={onClick}>
                {children}
            </Button>
            {
                split ? <div className='relative right-0  w-[1px] ml-[1px]'> </div> : null
            }

            <IconButton
                {...iconProps}
                onClick={(event) => {
                    const coords = ref.current.getBoundingClientRect();
                    setLocation({x:coords.x ,y: coords.y + coords.height + 5})
                    setEvent(event)
                }}
                icon={ <ChevronDown />}
                disable={disabled}
            /> 

            <ContextMenu 
                items={{title : menuHeader , items : menuItems }}
                fixedLocation={location}
                event={event}
            />
        </div>
    )
}

