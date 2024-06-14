/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { IconButton , ShareIcon } from '@/components';
// import ShareIcon from '../../components/icons/share.svg'

export default {
  title: 'Components/IconButton',
  component: IconButton,
  args : {
    tooltip : 'Whether to hide the content when the trigger becomes fully occluded.' ,
    value: "Text to copy" ,
    onClick : (e,v) => {
      console.log(e,v)
    }
  }
}

const Template= (args) => {
  return (
    <div className='m-[30px] ml-20' >
      <IconButton {...args} />
    </div>
  )
}

export const SimpleIconBtn = Template.bind({});
SimpleIconBtn.args={
  icon: <ShareIcon /> ,
  tooltip : 'share' ,
}


export const DangerIcon = Template.bind({});
DangerIcon.args={
  icon: <ShareIcon size={16} /> ,
  tooltip : 'share' ,
  variant : 'danger_white_text',
}

export const Rounded = Template.bind({});
Rounded.args={
  icon: <img src={ShareIcon} alt='sd' /> ,
  addClass: ['rounded-full']
}

export const RoundedDisable = Template.bind({});
RoundedDisable.args={
  icon: <img src={ShareIcon} alt='sd' /> ,
  addClass: ['rounded-full'] ,
  disable: true
}

