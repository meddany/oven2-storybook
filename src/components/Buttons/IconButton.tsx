// @ts-nocheck
import React, { forwardRef } from 'react'
import { TestButton } from './Button'


export const IconButton = forwardRef( (props, ref )=> {
    const { variant } = props;
    return (
        <TestButton {...props} ref={ref} size='icon' variant={variant ? variant : 'icon'}  />
      )
})

