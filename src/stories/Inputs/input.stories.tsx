// @ts-nocheck

import React, { useRef } from 'react';
import { Input , Frequency , AutoComplete } from '@/components';

export default {
  title: 'Components/Input',
  component: Input,
  args: {},
}

const Template =  (args) => {
    const ref = useRef()
    return (
        <div className='w-screen h-screen flex justify-center relative top-16'>
            <div className='w-[300px]'>
                { args.type == 'frequency' ? <Frequency {...args} ref={ref} /> : null  }
                { args.type == 'autocomplete' ? <AutoComplete {...args} ref={ref} /> : null }
                { args.type == 'primary' ? <Input {...args} ref={ref} /> : <Input {...args} ref={ref} /> }
            </div>
        </div>
    )
}

export const Password = Template.bind({});
Password.args = {
    placeholder : 'Enter your password..',
    title : 'Password' ,
    type : 'password',
    invalid : false ,
    description : 'Keep remember your password',
    size : 'lg'

};
export const Email = Template.bind({});
Email.args = {
    placeholder : 'Enter your email..',
    title : 'email' ,
    invalid : false,
    type: 'email',
    description : "Keep remember your email address.",
    size : 'lg'
};

export const Number = Template.bind({});
Number.args = {
    placeholder : 'Enter your number..',
    title : 'Number' ,
    invalid : false,
    type: 'number',
    description : "set number",
    size : 'sm'
};

export const FrequencyInput = Template.bind({});
FrequencyInput.args = {
    invalid : false,
    type: 'frequency',
    description : "Set frequency from select box.",
    size : 'sm' ,
    onInputChange:(value,ref)=>{
        console.log('coming value is ' ,ref)
    }
};

export const AutoCompleteInput = Template.bind({});
AutoCompleteInput.args = {
    invalid : false,
    type: 'autocomplete',
    description : "update auto complete ..",
    size : 'sm' ,
    options : [
        "thanks"
    ] ,
    placeholder : 'auto compelete' , 
    onInputChange:(value,ref)=>{
        console.log('coming value is ' ,ref)
    }
};

