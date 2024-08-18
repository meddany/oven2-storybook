// @ts-nocheck
import React , {useEffect, useRef,useState } from 'react';
import { Body , Frame , PropItem} from '@/components';

export default {
  title: 'Components/PropertiesItem',
  component:  PropItem ,
  args: {
  },
} 


const Template = (args) => {

    return (
        <Frame>
            <Body padding className='bg-white '>
                <div className='w-full flex flex-wrap gap-2'>
                    <PropItem {...args} />
                    <PropItem {...args} variant='secondary' />
                    <PropItem {...args} border />
                    <PropItem {...args} border variant='secondary' />
                    <PropItem {...args} border variant='secondary' copy={false} header="Show Icon" value="No" />
                    <PropItem {...args} border variant='secondary' header="Show Icon yes and check" value="No" />
                </div>
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});
Primary.args = {
    header : 'Connection name' ,
    value : "Netowrk Connection is not available"
}

