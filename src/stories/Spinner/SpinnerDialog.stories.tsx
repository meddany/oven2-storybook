// @ts-nocheck
import React , { useRef } from 'react';
import { SpinnerDialog } from '@/components';
import { Button } from '@/components';

export default {
  title: 'Components/SpinnerDialog',
  component: SpinnerDialog,
  args: {},
}

const Template = (args) => {
    const ref = useRef({})
    function handleClick(){
        ref.open()
    }
    return (
        <>
            <Button onClick={handleClick} >Show Spinner</Button>
            <SpinnerDialog  {...args} ref={ref} />
        </>
    );
}

export const Basic = Template.bind({});



export const Timeout = Template.bind({});
Timeout.args={
    timeout : true
}


export const CustomTimeoutPeriod = Template.bind({});
CustomTimeoutPeriod.args={
    timeout : true,
    period : 3000
}


export const SpinnerWhite = Template.bind({});
SpinnerWhite.args={
    timeout : true,
    period : 3000 ,
    variant : 'white'
}