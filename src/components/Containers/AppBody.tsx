// @ts-nocheck
import React, {forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils';

const vrs = cva(
    "bg-muted h-full w-full relative" ,
    {
        variants : {
            padding : {
                true : "p-1.5"
            }
        }
    }

)

export const Body = forwardRef( (props, ref ) => {
    const { className  , children , padding , style={} } = props;

    return (
        <div style={style} ref={ref} className={cn(vrs({ padding ,  })  , className  )} >
          {children}
        </div>
    )
})