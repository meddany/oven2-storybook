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
        id,
        warning,
    } = props

    return(
        <div id={id} ref={rref} className='drag-handler flex-wrap fixed left-[50%] top-[50%] z-50 flex translate-x-[-50%] translate-y-[-50%] max-w-[60vw] gap-4 border bg-background p-2 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg' >
            <div className='flex relative max-h-[60vh] w-fit max-w-[80vw] flex-wrap min-w-[200px]'>
                <div className='w-full relative'>
                    <PrimaryHeader {...props } />
                </div>
                {
                    warning ? <Alert severity="warning" children={warning} /> : null
                }

                <div className={'px-2 font-geist pb-[80px] w-full max-w-[80vw] text-wrap'}>
                    {body}
                </div>
                
                <div className='min-w-[300px]'>
                    <PrimaryFooter {...props} queue={queue} />
                </div>
                
            </div>
        </div>
    )
})
