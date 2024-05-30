// @ts-nocheck
import React, { useRef } from 'react';
import { InlineSpinner , Button } from '@/components';
export default {
  title: 'Components/InlineSpinner',
  component: InlineSpinner ,
  args: {},
}

const Template= (args) => {
    const ref = useRef({})
    return(
        <div className='w-[300px] relative h-[300px] bg-slate-400' >
            <p>INLINE DIALOG HERE.</p>
            <Button children='Inline dialog' onClick={()=>{
                ref.open()
            }} />


            <InlineSpinner ref={ref} {...args} />
        </div>
    )
}
export const Basic = Template.bind({});
Basic.args = {};

export const DefaultOpen = Template.bind({});
DefaultOpen.args = {
    defaultOpen:true ,
};

export const DefaultOpenWithWhite = Template.bind({});
DefaultOpenWithWhite.args = {
    defaultOpen:true ,
    variant: 'white'
};
