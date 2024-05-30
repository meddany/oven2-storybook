// @ts-nocheck
import React , { useRef , useState } from 'react';
import { ContextMenu } from '@/components';
import { MenuButton } from '@/components'
import { data } from '../../components/playground-data/ContextmenuItems'

export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  args: {
  },
}


const Template = (args) => {
    const [ event , setEvent ] = useState(null)
    const ref = useRef()

    function handler(e){
        console.log(e)
        setEvent(e)
    }

    return (
        <>  
            <MenuButton 
                onClick={handler}
            />
            <div ref={ref} className='l-[200px] absolute w-[600px] h-[300px] bg-blue-200' onContextMenu={handler}>CONTEXT MENU</div>
            <ContextMenu event={event} {...args} />
        </>
    );
}

export const Basic = Template.bind({});
Basic.args={
    items: {
        items : data , 
        title : 'Menu'
    } ,
    border : 'mid'
}

export const Basic2 = Template.bind({});
Basic2.args={
    items: {
        items : data , 
        title : 'Menu2'
    } ,
    border : 'mid'
}