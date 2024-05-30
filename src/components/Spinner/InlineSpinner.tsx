// @ts-nocheck
import React, { forwardRef, useEffect } from 'react'
import { SpinnerDialog } from './SpinnerDialog'

export const InlineSpinner = forwardRef( (props,ref) => {

    const { defaultOpen } = props

    useEffect( () => {
        if ( defaultOpen){
            if ( ref.current ){
                ref.open()
            }
        }
    }, [defaultOpen])

    
    return (
        <SpinnerDialog 
            {...props}
            inline
            open={true}
            ref={ref}
        />
    )
})