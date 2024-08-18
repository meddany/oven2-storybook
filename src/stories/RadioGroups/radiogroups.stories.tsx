// @ts-nocheck
import React , {useRef,useState } from 'react';
import { RadioGroup , Frame,Body , RadioItem  } from '@/components';
import { Chip } from '@mui/material';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} 

const Template = (args) => {

    return (
        <Frame>
            <Body padding>
                <div >
                    <RadioGroup onChange={(e,c,v) => {
                        console.log(e,c,v)
                    }} 
                    onContextMenu={(e,c,v) => {
                        console.log('group context menu clicked ' , e,c,v)
                    }}
                    >
                        <RadioItem header={<Chip label='Header1' />}>
                            <div>testing 1 </div>
                        </RadioItem>
                        
                        <RadioItem>testing 1 </RadioItem>
                    </RadioGroup>
                </div> 
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});