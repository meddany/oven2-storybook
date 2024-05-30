/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { Panel , Frame , Body } from '@/components'
import {longtext} from '../../components/playground-data/longtext'


export default {
  title: 'Components/Panel',
  component: Panel,
  args: {
    header : 'Notifications',
    shortInfo : 'Showing notifications from panel',
    children: longtext,
  },
}

const Template= (args) => (
    <div className='relative w-full h-40'>
        <Frame>
            <Body padding={true}>
                <Panel {...args} />
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
    closed: true
}

export const PanelWithSpinner = Template.bind({});
PanelWithSpinner.args = {
    height: '100px',
    collapsable: true , 
    closed: false ,
    spinnerState: true,
    className : 'bg-black' ,
    spinnerArgs: {
        variant: 'primary',
        timeout : true,
    }
}



