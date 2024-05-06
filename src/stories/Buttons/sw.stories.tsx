// @ts-nocheck
import PropTypes from 'prop-types';
import { useArgs } from '@storybook/store';
import TestIcon from '../../img/icon.png'
import { useRef } from 'react';
import { Switch }from '../../components/oven2'
import '../../../src/components/oven2/colors/palette.css'

export default {
    title : 'Switch/Android' , 
    component : Switch  , 
}


const Template = args => {
    const [ _ , updateArgs ] = useArgs();
    const ref = useRef()
    return(
        <Switch ref={ref} {...args} />
    )
} ;

export const AndroidSwitchTheme = Template.bind({})

AndroidSwitchTheme.args = {
    theme : 'android',
    // label : 'android theme' ,
    // color : 'var(--oven-teal-mid-green)'
    defaultChecked:true ,
    onChange: (event, value) => {
        console.log('swtich status enable : ' , value)
    }
}
