// @ts-nocheck
import React, { forwardRef } from 'react'
import './Sub_Components/custom-scrollbar.css'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const vrs = cva('custom-scroll-bar overflow-auto relative h-full w-full' , {})

export const ScrollArea = forwardRef( (props, ref ) => {
    const { children , className } = props
    return(
        <div {...props} className={cn(vrs({}) , className )} ref={ref} >
            {children}
        </div>
    )
})