// @ts-nocheck
import React , {useEffect, useRef,useState } from 'react';
import { Body , Frame , Switch, Tabs } from '@/components';
import { useRandomId } from '@/components';

export default {
  title: 'Components/Tabs',
  component:  Tabs ,
  args: {
  },
} 


const Template = (args) => {
    const [ tabs , setTabs ] = useState([])

    useEffect( () => {
        setTimeout( () => {
            console.log('ip')
            setTabs([
                {
                    label : 'Create new account' ,
                    value : '1' ,
                    content : 
                    <div>
                        <Switch  label='Create new account'/>
                    </div>
                } ,
                {
                    label : 'Login Platform' ,
                    value : '2' ,
                    default : true,
                    content : <div>Login to Platform</div>
                } ,
            ])
        } , 2000)
    } , [])

    return (
        <Frame>
            <Body padding className='bg-red-400 '>
                <div className='w-[600px] h-full flex justify-center'>
                    <Tabs {...args} tabs={tabs} />
                </div>
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});
Primary.args = {
    onChange:(params,v) => {
        console.log(params,v)
    } ,
    center: true,
    outline: false,
}

