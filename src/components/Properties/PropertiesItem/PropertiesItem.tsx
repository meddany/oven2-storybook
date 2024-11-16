
// @ts-nocheck
import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { CopyButton } from '@/components/Buttons/CopyButton'
import { Label } from '@/components'

const vrs = cva('h-fit p-2 rounded relative pr-6 ease-in-out transition-all duration-75' , {
    variants : {
        variant : {
            primary : 'bg-white hover:outline outline-blue-200 outline-[2px] [&_.css9231]:hover:visible' ,
            secondary : 'bg-accent hover:outline outline-blue-200 outline-[2px] [&_.css9231]:hover:visible' ,
        } ,
        border : {
            true : 'border-[1px] border-blue-100'
        } ,
        copy : {
            false : "[&_.css9231]:hidden"
        }
    }
 
})

export const PropertiesItem = (props) => {

    const { 
        variant='primary' ,
        className,
        header='' ,
        value='' ,
        border=false,
        copy=true,
        copyValue=null,
    } = props

    return (
        <div className={cn(vrs({variant , border , copy }) , className )}>
            <div className='absolute -right-[8px] z-40 -top-2 css9231 delay-75 invisible scale-[.65] ease-in-out transition-all duration-75'>
                <CopyButton value={copyValue ? copyValue : value} outline={false} />
            </div>
            <div className='mr-[20px]'>
                <p className={'select-none text-gray-500 text-[12px] font-Roboto'}>{header}</p>
            </div>
            <div>
                <Label className={'font-Roboto text-[14px]'}>{value}</Label>
            </div>
        </div>
    )
}

