// @ts-nocheck
import React , {useEffect, useRef,useState } from 'react';
import { Body , Frame , DialogPanel , SpinnerDialog } from '@/components';
import { useRandomId } from '@/components';

export default {
  title: 'Playground/SpinnerAndDialog',
  component : DialogPanel
} 


const Template = (args) => {
    const ref= useRef({})
    const ref2= useRef({})

    useEffect( () => {
        if ( ref.open ){
            ref.open()
        }
    } , [ref])

    return (
        <Frame>
            <Body padding >
                <SpinnerDialog  ref={ref} />
                <DialogPanel ref={ref2} defaultOpen >
                    <div className='w-[600px] bg-white'>
                        Thanks for letting me know i can do that.
                    </div>
                </DialogPanel>
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});
Primary.args = {

}

