// @ts-nocheck
import React, { forwardRef , useEffect, useRef } from 'react'
import { Panel } from './Panel'
import { Model } from './Model'
import { Button } from '..'

export interface DialogPanelProps {
    children : any , 
    header : string , 
    shortInfo : string ,
    close : boolean | string , 
    collapsable : boolean,
    ref?: object ,
    defaultOpen: boolean
}

export const DialogPanel = forwardRef< HTMLDivElement ,DialogPanelProps>( (props,ref) => {
    const { children , 
        header  , 
        shortInfo,
        close , 
        collapsable , 
        defaultOpen=false
    } = props
    const rref = useRef({})

    useEffect( () => {
        if ( defaultOpen ){
            ref.current.open()
        }
    } , [defaultOpen,ref])

    return (
        <Model ref={ref ? ref : rref }>
            <div className=''>
                <Panel 
                    variant="dialog"
                    header={header ? header : 'Information'}
                    shortInfo = {shortInfo ? shortInfo : ''}
                    close={close ? close : 'button'}
                    width = ''
                    collapsable={collapsable}
                    children={
                        <div className='max-w-[calc(50vw)] max-h-[calc(100vh-200px)]' >
                            {children}
                        </div>}
                    footer={
                        <Button onClick={() => {
                            ref.current.close()
                        }} variant='minimal_border'>Close</Button>
                    }
                />
            </div>
        </Model>
      )
})
  
