// @ts-nocheck
import React , {useRef} from 'react';
import { Body , Frame } from '@/components';


export default {
  title: 'Components/Body',
  component: Body,
  args: {
    children: 'SOME CONTENT IS GOING HERE.'
  },
} 

const Template = (args) => {
    const ref = useRef()

    return (
        <Frame>
            <Body ref={ref} {...args} />
        </Frame>
    )
}

export const BodyBasic = Template.bind({});

export const BodyBasicPadding = Template.bind({});
BodyBasicPadding.args={
    padding:true,
}

export const ExtraClasses = Template.bind({});
ExtraClasses.args={
    className: 'bg-yellow-400'
}

