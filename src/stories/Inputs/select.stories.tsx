// @ts-nocheck
import { useArgs } from '@storybook/store';
import { useRef } from 'react';
import {Select} from '../../components/oven2/'

export default {
    title : 'Components/Select' , 
    component : Select  , 
    args : {
        options : ['option1' , 'option2' , 'option3'] ,
        maxWidth: '100%' ,
        maxHeight: '100%' ,
        size : 'small' ,
        multiple: false,
        customSize : undefined ,
        defaultValue : 'option1',
        label : 'select an option.',
        onChange: (e,v) => {
            console.log(e,v)
        }
    }
}


const Template = args => {
    const ref = useRef()
    return(
        <div style={{width : '30vw' , height :'40px' , marginTop : '20px' , marginLeft : '20px'}} >
            <Select ref={ref} {...args} />
        </div>
    )
} 

export const Basic = Template.bind({})

/** custom width and height, width 30px and height is 100px */
export const CustomWidth = Template.bind({})
CustomWidth.args ={
    maxWidth : '100px' ,
    maxHeight: '30px'
}


/** custom width and height, width 30px and height is 100px */
export const MultipleSelection = Template.bind({})
MultipleSelection.args ={
    multiple : true,
    defaultValue : ['option1' , 'option2']
}