// @ts-nocheck
import PropTypes from 'prop-types'
import $ from 'jquery'
import { useArgs } from '@storybook/store';
import MuiSelectBox from '../components/oven2/MuiSelectBox/MuiSelectBox';

export default {
  title: 'Selection Boxes',
  component: MuiSelectBox,
  propTypes : {
    event : PropTypes.object
  }
}

const Template = args => {
    const [ _ , updateArgs ] = useArgs();

    function handleContextMenu(event){
        updateArgs({ event : event })
    }
    
    return <MuiSelectBox {...args} />
}

export const MuiSelect = Template.bind({})
MuiSelect.args = {
    size : 'small' ,
    label : 'Set Option' ,
    multiple : false , 
    value: undefined,
    options : [ '1', '2', '3', '4' ] ,
    onChange: (e,v) => {
        console.log(v)
    },
}

MuiSelect.argTypes={
    size : {
        options : ['small' , 'large' , 'huge' ] ,
        control : {
            type :'select' ,
        }
    }
}

