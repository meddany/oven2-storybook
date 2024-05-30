// @ts-nocheck
import React from 'react';
import { Spinner } from '@/components';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  args: {},
}

const Template = (args) => (
  <Spinner {...args} />
);

export const Basic = Template.bind({});


export const Small = Template.bind({});
Small.args = {
    size : 'small'
}

export const Large = Template.bind({});
Large.args = {
    size : 'large'
}


export const LargeBlur = Template.bind({});
LargeBlur.args = {
    size : 'large' ,
    variant : 'blur'
}

export const Primary = Template.bind({});
Primary.args = {
    size : 'small',
    variant : 'primary'
}


export const White = Template.bind({});
White.args = {
    size : 'small' ,
    variant : 'white'
}
export const Blur = Template.bind({});
Blur.args = {
    size : 'small' ,
    variant : 'blur'
}


export const CustomLoadingText = Template.bind({});
CustomLoadingText.args = {
    size : 'small' ,
    variant : 'white' ,
    text: 'Now Loading ...'
}
