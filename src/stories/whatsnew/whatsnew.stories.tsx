// @ts-nocheck
import React from 'react';
import { Whatsnew } from '@/components';
import { Container } from '@/components';
import  Img1  from './src/img1.jpg'

export default {
  title: 'Components/Whatsnew',
  component: Whatsnew,
  args: {},
};

const Template = (args) => (
    <Container className=' h-screen relative flex justify-center items-center' >
        <Whatsnew {...args} />
    </Container>
  
);

export const Story = Template.bind({});
Story.args = {
    items : [
        {
            src : Img1 ,
            header : "Network Assurance",
            position : '100%'
        },
        {
            src : 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800' ,
            header : "Network Full visibility",
            position : '20%'
        },
    ] ,
    autoplay : true,
    delay : 5000
};
