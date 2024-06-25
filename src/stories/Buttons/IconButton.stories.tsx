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

export const Primary = Template.bind({});
Primary.args={
  icon: <ShareIcon /> ,
  tooltip : 'share' ,
  variant: 'primary' ,
  border: true , 
  disable:false
}

export const Secondary = Template.bind({});
Secondary.args={
  icon: <ShareIcon /> ,
  tooltip : 'share' ,
  variant: 'secondary' ,
  border: true , 
  disable:false

}






