/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { SplitButton } from '@/components';


export default {
  title: 'Components/SplitButton',
  component: SplitButton,
}

const Template= (args) => {
  return (
    <div className='ml-20 bg-red-300 p-3 absolute top-[130] left-[30px] overflow-hidden' >
      <SplitButton {...args} 
        menuHeader="Header" 
        children={'Click Me'}
          menuItems={[
            {
              label : 'Split button',
              size : 'sm' ,
              action: ()=>{},
            },
            {
              label : 'Split button',
              type: 'custom' ,
              custom : <div className='h-[60px] bg-red-400 w-full'>Custom Body</div> ,
              action: ()=>{},
            },
          ]}
        />
    </div>
  )
}

export const Ghost = Template.bind({});
Ghost.args={
  tooltip : 'share' ,
  variant: 'ghost'
}
export const Primary = Template.bind({});
Primary.args={
  tooltip : 'share' ,
  variant: 'primary'
}







