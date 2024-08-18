// @ts-nocheck
import React , {useRef,useState } from 'react';
import { Body , Frame , Toast, Button } from '@/components';
import { useRandomId } from '@/components';

export default {
  title: 'Components/Toast',
  component: Toast,
} 

const Template = (args) => {
    const [ item , setItem ]  = useState({})

    const handleClick1 = (mode,light) => {
        setItem({
            header : mode  ,
            body : `Object created with id ${useRandomId()}`,
            type : mode ,
            mode : light ,
            icons : true,
            duration: 5000 ,
            buttons : [
                (item) => {
                    return <Button className={'!max-w-120px h-[30px]'} variant='primary' onClick={item.dismiss} >DISMISS</Button>
                }
            ]
        })
    }

    return (
        <Frame>
            <Body padding>
                <div className='w-full flex space-x-2 flex-wrap space-y-1 '>
                    <Button onClick={()=>{handleClick1('progress' , 'light')}} > SHOW progress -light</Button>
                    <Button onClick={()=>{handleClick1('info' , 'light')}} > SHOW INFO -light</Button>
                    <Button onClick={()=>{handleClick1('error' , 'light')}} > SHOW ERROR -light </Button>
                    <Button onClick={()=>{handleClick1('warning' , 'light')}} > SHOW warning -light </Button>
                    <Button onClick={()=>{handleClick1('success' , 'light')}} > SHOW success -light </Button>
                    <Button onClick={()=>{handleClick1('info' , 'dark')}} > SHOW INFO -dark</Button>
                    <Button onClick={()=>{handleClick1('error' , 'dark')}} > SHOW ERROR -dark </Button>
                    <Button onClick={()=>{handleClick1('warning' , 'dark')}} > SHOW warning -dark </Button>
                    <Button onClick={()=>{handleClick1('success' , 'dark')}} > SHOW success -dark </Button>
                    <Button onClick={()=>{handleClick1('progress' , 'dark')}} > SHOW progress -dark</Button>
                </div> 
                <Toast item={item} />
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});