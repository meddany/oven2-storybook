// @ts-nocheck
import React, { forwardRef , useRef } from 'react'
import { Panel } from './Panel'
import { Model } from './Model'
import { Button } from '..'

export const DialogPanel = forwardRef( (props,ref) => {
    const { children , header  , shortInfo ,close , collapsable } = props
    const rref = useRef({})
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
  
