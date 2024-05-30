// @ts-nocheck
import React, { forwardRef , useRef } from 'react'
import { Spinner } from './Spinner'
import { Model } from '..'

export const SpinnerDialog = forwardRef( (props,ref) => {
    const { variant , size , text,timeout , period , inline  } = props
    const rref = useRef()
    return (
        <Model inline={inline} ref={ref || rref }>
            <div className=''>
                <Spinner variant={variant} size={size} period={period} text={text} timeout={timeout} />
            </div>
        </Model>
      )
})
  
