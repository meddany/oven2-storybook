// @ts-nocheck
import React , {useEffect, useRef,useState } from 'react';
import { Body , Frame , TinnyHelp} from '@/components';

export default {
  title: 'Components/Help/TinnyHelp',
  component:  TinnyHelp ,
} 


const Template = (args) => {

    return (
        <Frame>
            <Body padding className='bg-white '>
                <div className='w-full flex flex-wrap gap-2'>
                    <TinnyHelp { ...args } />
                </div>
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});
Primary.args = {
    more: <div>Thanks for let me know you can do it</div> ,
    info : "Thanks for this great help",
}