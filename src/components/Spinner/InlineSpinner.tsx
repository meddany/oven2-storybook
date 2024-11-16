// @ts-nocheck
import React, { forwardRef, useEffect, useRef } from 'react'
import { SpinnerDialog } from './SpinnerDialog'

export const InlineSpinner = forwardRef( (props,ref) => {

    const { defaultOpen } = props
    const rref = useRef({})

    useEffect( () => {
        if ( defaultOpen){
            if ( ref ){
                if ( ref.current ){
                    ref.open()
                }
            }
            else if ( rref ){
                if ( rref.current ){
                    rref.open()
                }
            }
        }
    }, [defaultOpen])
    
    return (
        <SpinnerDialog 
            {...props}
            inline
            open={true}
            ref={ref || rref }
        />
    )
})