// @ts-nocheck
import React, { forwardRef } from 'react'
import SingleMenuItem from './MenuItem'

export const BackMenuItem = forwardRef( (props, ref ) => {
    const { isOnScreenSubMenu , options } = props

    return (
        <>
            {
                isOnScreenSubMenu ?
                <>
                    <SingleMenuItem 
                        menuRef={ref}  
                        options={options} 
                        type="back" 
                    />
                    <div style={{paddingBottom : '10px'}} />
                </> 
                : 
                    null 
            }
            
        </>
    )

})
