// @ts-nocheck
import React, { useRef } from 'react';
import { Model , Button } from '@/components'

export default {
  title: 'Components/PlainModel',
  component: Model,
  args: {
  },
}

const Template= (args) => {
    const ref = useRef({})

    function handleClick(){
        ref.current.open()
    }

    return(
        <>
            <Button onClick={handleClick} >Open Model</Button>
            <Model ref={ref} {...args} />
        </>
    )
}

export const ModelBasic = Template.bind({});


export const ModelCloseWhenClickOnBody = Template.bind({});
ModelCloseWhenClickOnBody.args = {
    bodyClick: true
};


export const BlurModel = Template.bind({});
BlurModel.args = {
    bodyClick: true,
    variant: 'blur'
};


export const TransparentModel = Template.bind({});
TransparentModel.args = {
    bodyClick: true,
    variant: 'transparent'
};

export const BlurModelWithChildren = Template.bind({});
BlurModelWithChildren.args = {
    bodyClick: true,
    variant: 'blur',
    children : 'This is a new model'
};
