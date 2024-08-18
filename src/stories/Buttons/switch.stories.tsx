/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { Switch } from '@/components';


export default {
  title: 'Components/Switch',
  component: Switch,
}

const Template= (args) => {
  return (
      <Switch {...args}/>
  )
}

export const Primary = Template.bind({});
Primary.args={
}







