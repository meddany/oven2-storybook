// @ts-nocheck
import React , {useEffect, useRef,useState } from 'react';
import { Body , Frame , HelpPopover} from '@/components';

export default {
  title: 'Components/Help/HelpPopover',
  component:  HelpPopover ,
} 


const Template = (args) => {

    return (
        <Frame>
            <Body padding className='bg-white '>
                <div className='w-full flex flex-wrap gap-2'>
                    <HelpPopover { ...args } />
                </div>
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});
Primary.args = {
    info : "Thanks for this great help",
    variant: 'primary',
    size : 'lg'
}