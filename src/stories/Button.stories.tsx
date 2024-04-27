// @ts-nocheck
import { OvenButton } from '../components/oven2/Oven'
import PropTypes from 'prop-types';

export default {
    title : 'OvenButton' , 
    component : OvenButton  , 
    argTypes : { onClick : { action : 'handleClick' } },
}

const Template = args => <OvenButton {...args} /> ;

export const MuiButton = Template.bind({})

MuiButton.args = {
    children: 'Click Me' ,
    light : true,
    title : 'Hover Clicking Me', 
    bordered: true,
    background: false ,
    disable : false,
    oargs : {},
}
