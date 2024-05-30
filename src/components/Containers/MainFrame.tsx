// @ts-nocheck
import React, { forwardRef } from 'react'
import { cva } from 'class-variance-authority'


export const Frame = forwardRef( (props, ref ) => {
    const { children  } = props;

    return (
        <div ref={ref} className="relative h-screen w-screen">
          {children}
        </div>
    )
})