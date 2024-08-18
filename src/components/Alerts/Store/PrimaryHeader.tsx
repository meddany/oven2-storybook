// @ts-nocheck
import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import SuccessIcon from '../src/success.png'
import AlertIcon from '../src/alert.png'
import ErrorIcon from '../src/error.png'
import AskIcon from '../src/ask.png'
import { GripHorizontal } from 'lucide-react'
import { Tooltip } from '@/components'

const vrs = cva( 'p-1 w-full font-Roboto flex text-black transition-all ease-linear duration-[1s] rounded-sm relative' , {
    variants : {
    } ,
    defaultVariants : {
        alert : true,
    }
})


export const PrimaryHeader = (props) => {

    const {
        header,
        alert ,
        error,
        success,
        confirm,
    } = props

    return (
        <div className={cn(vrs({success,alert,error,confirm}) , '')} >
            <div className='flex relative w-full'>
                <div className='w-full'>
                    <h1 className='text-2xl pt-1 w-full pl-4 select-none font-Roboto'>{ header || "Confirmation"} </h1>
                </div>
                <Tooltip >
                    <div className='drag-handler-box ml-[10px] flex justify-center items-center h-full'>
                        <GripHorizontal size={12} className='hover:bg-accent rounded w-[40px] p-2 h-[40px] text-gray-600 hover:cursor-move' />
                    </div>
                </Tooltip>
            </div>

        </div>
    )
}

