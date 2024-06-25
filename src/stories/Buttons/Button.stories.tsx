/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useRef } from 'react';
import { Button } from '@/components';
import ShareIcon from '../../components/icons/share.svg'

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children : 'CLICK HERE',
    disable : false ,
    disableAfterClick: false ,
    autoFocus : false ,
    addClass : [] ,
    size : 'lg' ,
    tooltip: null,
    onClick: (e,ref)=>{
      console.log(e,ref)
    }
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  const ref = useRef()
  return (
    <div className='m-2.5' >
      <Button ref={ref} {...args} />
    </div>
  )
} 

export const Basic = Template.bind({});

export const DisableAfterClick = Template.bind({});
DisableAfterClick.args={
  disableAfterClick: true,
}

export const Primary = Template.bind({});
Primary.args={
  variant: 'primary',
  tooltip: 'this is tooltip is ok ?',
  border: true , 
}

export const Secondary = Template.bind({});
Secondary.args={
  variant: 'secondary',
  tooltip: 'this is tooltip is ok ?',
  border: true , 
}


export const DangerButton = Template.bind({});
DangerButton.args={
  variant: 'danger',
  children : "REMOVE CONNECTION"
}
export const DangerButtonWithWhiteText = Template.bind({});
DangerButtonWithWhiteText.args={
  variant: 'danger_white_text',
  children : "REMOVE CONNECTION"
}

export const AddCustomClass = Template.bind({});
AddCustomClass.args={
  addClass: ['bg-yellow-400'] 
}

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args={
  variant:'secondary' ,
  icon: <img className='text-white' src={ShareIcon} alt='s' />
}
