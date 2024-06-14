/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { CopyButton } from '@/components';

export default {
  title: 'Components/CopyButton',
  component: CopyButton,
  value: 'text to copy to clipboard',
}

const Template= (args) => {
  return (
    <div className='mx-2.5' >
      <CopyButton {...args} />
    </div>
  )
}

export const CopyButtonTemplate = Template.bind({});
CopyButtonTemplate.args={
  value : 'text to copy to clipboard'
}
export const LongTimeRestoreIcon = Template.bind({});
LongTimeRestoreIcon.args={
  value : 'text to copy to clipboard',
  restoreSec : 10000
}