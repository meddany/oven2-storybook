/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { Panel , Frame , Body , Input } from '@/components'
import {longtext} from '../../components/playground-data/longtext'


export default {
  title: 'Components/Panel',
  component: Panel,
  args: {
    header : 'Notifications',
    // shortInfo : 'Showing notifications from panel',
    children: longtext,
  },
}

const Template= (args) => (
    <div className='relative w-full h-40'>
        <Frame>
            <Body padding={true}>
                <Panel {...args}  spinnerState={false}>
                    <div className='w-full p-4' >
                        <Input variant='primary' 
                            placeholder='Enter your password..'
                            title= 'Password' 
                            type ='password'
                            description ='Keep remember your password'
                            size = 'lg'
                            />
                    </div>
                </Panel>
            </Body>
        </Frame>
        
    </div>
  
);

export const PanelBasic = Template.bind({});
    PanelBasic.args = {
};

export const PanelAutoHeight = Template.bind({});
PanelAutoHeight.args = {
    height: 'auto'
}
export const PanelFixedHeight = Template.bind({});
PanelFixedHeight.args = {
    height: '100px'
}

export const PanelCollapsable = Template.bind({});
PanelCollapsable.args = {
    height: '100px',
    collapsable: true , 
}


export const PanelNoDesc = Template.bind({});
PanelNoDesc.args = {
    shortInfo : '' 
}; 

export const PanelCollapsableDefaultClosed = Template.bind({});
PanelCollapsableDefaultClosed.args = {
    height: '100px',
    collapsable: true , 
    closed: true ,
    description: 'Hello from JS world'
}

export const PanelWithSpinner = Template.bind({});
PanelWithSpinner.args = {
    height: '100px',
    collapsable: true , 
    closed: false ,
    spinnerState: true,
    spinnerArgs: {
        variant: 'primary',
        timeout : true,
    }
}



