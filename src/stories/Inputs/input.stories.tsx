// @ts-nocheck

import React, { useRef, useState } from 'react';
import { Input , Frequency , AutoComplete } from '@/components';
import { useRandomId , Button } from '@/components';
import { convertNumberToArray } from '@/components/utils/utils';

export default {
  title: 'Components/Input',
  component: Input,
  args: {},
}

const Template =  (args) => {
    const ref = useRef()
    const [ label , setLabel ] = useState()

    function handleLabel(){
        const label = useRandomId()
        console.log('set random label to ' , label)
        setLabel(label)
    }

    return (
        <>
            <Button onClick={handleLabel}> SET RANDOM LABEL</Button>
            <div className='w-screen h-screen flex justify-center relative top-16'>
                <div className='relative'>
                    { args.type == 'frequency' ? <Frequency {...args} ref={ref} /> : null  }
                    { args.type == 'autocomplete' ? <AutoComplete {...args} ref={ref} /> : null }
                    { args.type == 'select' ? <AutoComplete {...args} ref={ref} /> : null }
                    { args.type == 'text' ? <Input {...args} ref={ref} value={label} /> : null }
                    { args.type == 'password' ? <Input {...args} ref={ref} /> : null }
                    { args.type == 'email' ? <Input {...args} ref={ref} /> : null }
                    { args.type == 'number' ? <Input {...args} ref={ref} /> : null }
                    { args.type == 'multiple' ? <Input {...args} ref={ref} /> : null }
                </div>
            </div>
        </>

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
    size : 'sm' ,
};

export const FrequencyInput = Template.bind({});
FrequencyInput.args = {
    invalid : false,
    type: 'frequency',
    description : "Set frequency from select box.",
    size : 'sm' ,
    onChange:(value,ref)=>{
        console.log('coming value is ' ,ref)
    }
};


export const TextControlled = Template.bind({});
TextControlled.args = {
    description : "controlled input",
    className: 'w-[400px]' ,
    type: 'text' ,
    value: 'next ...' , 
    defaultValue: 'Default value is placed here.' ,
    controlled:true,
    onChange:(ref,value)=>{
        console.log('coming value is ' ,value)
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
    onChange:(value,ref)=>{
        console.log('coming value is ' ,ref)
    }
};

export const AutoCompleteInputNestted = Template.bind({});
AutoCompleteInputNestted.args = {
    invalid : false,
    type: 'autocomplete',
    description : "update auto complete ..",
    size : 'sm' ,
    nested:true,
    loading:true,
    accessKey: 'id' ,
    options : [
        { label : 'Ahmed' , id : 1 , placeholder : '23'},
        { label : 'Mohamed' , id : 2 , placeholder : '24'},
    ] ,
    placeholder : 'auto compelete' , 
    onChange:(ref,v,item)=>{
        console.log('coming value is ' , v , item )
    }
};

export const AutoCompleteControlled = Template.bind({});
AutoCompleteControlled.args = {
    invalid : false,
    type: 'autocomplete',
    description : "update auto complete ..",
    // value: 'thanks2' ,
    defaultValue: 'thanks2' ,
    options : function(){
        return convertNumberToArray(300).map( item => useRandomId() )
    }() ,
    placeholder : 'Select Network Element' ,
    onLoad : (ref) => {

    } ,
    onChange: (e,v) => {
        console.log('selection changed ' ,  e , v)
    }
};


export const Select = Template.bind({});
Select.args = {
    invalid : false,
    type: 'select',
    description : "update auto complete ..",
    defaultValue: 'thanks2' ,
    options : function(){
        return convertNumberToArray(300).map( item => useRandomId() )
    }() ,
    placeholder : 'Select Network Element' ,
    onLoad : (ref) => {
    } ,
    onChange: (e,v) => {
        console.log('selection changed ' ,  e , v)
    }
};

export const Multiple = Template.bind({});
Multiple.args = {
    multiple:true ,
    type : 'multiple',
    description : 'Multiple selection ..',
    placeholder : 'Multiple selection ......'
};


