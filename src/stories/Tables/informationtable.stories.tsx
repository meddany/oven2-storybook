// @ts-nocheck
import React , { useRef } from 'react';
import { InformationTableMui } from '@/components';
import { data } from '@/components/playground-data/informationtabledata'

export default {
  title: 'Components/InformationTable',
  component: InformationTableMui,
  args: {
    data : data
  },
}

const Template = (args) => {
    return (
        <>
            <div className='w-[50%] relative' >
                <InformationTableMui  {...args} />
            </div>
        </>
    );
}

export const Basic = Template.bind({});
Basic.args={
    
}