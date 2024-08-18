import React from 'react'
import { CircleHelp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

const vrs = cva('text-gray-600', {
    variants : {
        size : {
            'sm' : 'w-[14px] h-[14px]' ,
            'mid' : 'w-[20px] h-[20px]' ,
            'lg' : 'w-[30px] h-[30px]',
            'xl' : 'w-[40px] h-[40px]',
        } ,
        variant : {
            primary : 'text-blue-600' ,
            secondary : 'text-gray-600'
        }
    }
    
})

export const HelpPopover = (props) => {

    const {
        size='m' ,
        info,
        variant='primary',
        className
    } = props;

    return (
        <HoverCard>
            <HoverCardTrigger>
                <CircleHelp className={cn(vrs({size , variant }) , className )} />
            </HoverCardTrigger>
            {
                info ? 
                <HoverCardContent className='p-1'>
                    {info}
                </HoverCardContent> 
                : null
            }
        </HoverCard>
    )
}