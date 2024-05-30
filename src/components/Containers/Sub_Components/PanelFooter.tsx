/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef } from 'react'
import { Separator } from "@/components/ui/separator"
import { CardFooter } from "@/components/ui/card"

export const PanelFooter = forwardRef( (props, ref ) => {

    const { footer , close } = props;

    return (
        <>
            {
                footer && (close == 'button' || ! close  )? 
                <>
                    <Separator className={'css-i231'} />
                    <CardFooter className='mt-3 h-12'>
                        {footer}
                    </CardFooter>
                </>
                : null
            }
        </>
    )
})

