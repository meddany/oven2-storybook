// @ts-nocheck
import React, { forwardRef } from 'react'
import { MuiAndroidSwitch } from '../MuiAndroidSwitch'
export const Switch = forwardRef( (props,ref) => {
    const { theme } = props
    
    return (
        <>
            {
            theme == 'android' ? <MuiAndroidSwitch {...props} ref={ref} /> : null
            }
        </>
    )
})


