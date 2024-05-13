// @ts-nocheck
import PropTypes from 'prop-types'
import { useArgs } from '@storybook/store'
import { useRef } from 'react'
import { AppFrame , Button , SimpleAlerts     } from '../../components/oven2'

export default {
  title: 'DialogsAndModels/SimpleAlerts',
  component: AppFrame,
  tags : ['autodocs'] ,
  args : {
    header : 'Confirmation Message' ,
    body : 'On your Confirmation day. What a very special time.',
    onAccept : () => {console.warn('confirmed')},
    onCancel : () => {console.warn('cancelled')},
    accept : 'Accept' ,
    decline : 'cancel' ,
    danger : false ,
    preventSpamming : true
  }
}

const Template = (args) =>  {
    const callback = useRef({})
    return (
      <>
        <Button theme='mui'  children="Show Confirm" onClick={()=>{
          callback.current.api.confirm({...args , callback })
        }} />
        <Button theme='mui'  children="Show Alert" onClick={()=>{
          callback.current.api.alert({...args , callback })
        }} />
        <Button theme='mui'  children="Show Warning" onClick={()=>{
          callback.current.api.warning({...args , callback })
        }} />
        <Button theme='mui'  children="Show Error" onClick={()=>{
          callback.current.api.error({...args , callback })
        }} />
        <SimpleAlerts callback={callback} />
      </>
    )
} 

export const ConfirmDialog = Template.bind({})


