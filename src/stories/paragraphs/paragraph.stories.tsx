// @ts-nocheck
import React , {useRef,useState } from 'react';
import { Body , Frame , MainHeader , SubHeader , Label } from '@/components';
import { useRandomId } from '@/components';

export default {
  title: 'Components/Headers',
  component: MainHeader,
} 

const Template = (args) => {

    return (
        <Frame>
            <Body padding>
                <div className=''>
                    <MainHeader>Checkout this MAIN HEADER label in Roboto!</MainHeader>
                    <br />
                    <SubHeader>Checkout this SUB HEADER label in Roboto!</SubHeader>
                    <br />
                    <Label>Checkout this body label in Roboto!</Label>
                </div> 
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});