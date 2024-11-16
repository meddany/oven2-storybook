// @ts-nocheck
import React, { forwardRef, useEffect, useRef ,useState   } from 'react'
import {  ScrollArea } from '@/components'
import { PrimaryHeader } from './PrimaryHeader'
import { PrimaryFooter } from './PrimaryFooter'
import Alert from '@mui/material/Alert';
import { AlertsContext } from '../main'
import { useContext } from 'react'

export const PrimaryAlertPaper = forwardRef( (props, ref ) => {

    const rref = useRef(null)
    const { queue } = useContext(AlertsContext)

    const {
        body,
        warning,
    } = props

    return (
        <div className='absolute w-screen h-screen flex items-center justify-center transparent' >
            <div className='flex relative px-2 bg-white border w-fit  max-w-[50vw] flex-wrap min-w-[200px] shadow-2xl rounded'>
                <div className='border-b w-full'>
                    <PrimaryHeader {...props} />
                </div>

                {warning ? <Alert severity="warning" children={warning} /> : null}
                
                <ScrollArea className='font-aptos max-h-[60vh] mt-1 w-full overflow-auto min-h-[60px] hover:bg-accent gap-x-1 transition-colors rounded-md p-2 flex'>
                    {body}
                </ScrollArea>

                <div className='w-full py-1'>
                    <PrimaryFooter {...props} queue={queue} />
                </div>
            </div>
        </div>
      )
})
