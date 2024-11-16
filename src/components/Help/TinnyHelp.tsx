// @ts-nocheck
import { Info } from '@/components'
import { cn } from '@/components';
import { cva } from '@/components';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

const vrs = cva('overflow-visible flex pr-2 font-Roboto text-gray-500', {
    variants : {
        size : {
            'sx' : 'text-[8px]' ,
            'sm' : 'text-[12px]' ,
            'lg' : 'text-[14px]',
        }
    }
    
})


export const TinnyHelp = (props) => {

    const {
        info ,
        more ,
        className='',
    } = props;

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className='overflow-visible space-x-1 text-[12px] select-none relative h-full flex items-center text-nowrap'>
                    <Info className='w-[15px] text-blue-500 ' />
                    <div className={cn(vrs({}) , className)} >
                        { info || ''}
                    </div>
                </div>
            </HoverCardTrigger>
            {
                more ? 
                <HoverCardContent>
                    {more}
                </HoverCardContent> : null
            }

        </HoverCard>

    )
}

