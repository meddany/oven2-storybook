// @ts-nocheck
import PropTypes from 'prop-types';
import { useArgs } from '@storybook/store';
import TestIcon from '../../img/icon.png'
import { useRef } from 'react';
import { Switch }from '../../components/oven2'
import '../../../src/components/oven2/colors/palette.css'

export default {
    title : 'Components/Switch' , 
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
    defaultChecked:true ,
    onChange: (event, value) => {
        console.log('swtich status enable : ' , value)
    }
}
