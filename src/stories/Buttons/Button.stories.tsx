// @ts-nocheck
import PropTypes from 'prop-types';
import { useArgs } from '@storybook/store';
import TestIcon from '../../img/icon.png'
import { useRef } from 'react';
import { Button }from '../../components/oven2'


const meta = {
    title : 'components/Buttons' , 
    component : Button  , 
    tags: ['autodocs'] ,
    argTypes : { onClick : { action : 'handleClick' } },
    propTypes : {
        children : PropTypes.node,
        onClick : PropTypes.func,
        light : PropTypes.bool,
        title : PropTypes.string,
        bordered : PropTypes.bool,
        background : PropTypes.string,
        disable : PropTypes.bool,
        oargs : PropTypes.object,
        progress : PropTypes.bool,
        progressText : PropTypes.string,
        progressColor : PropTypes.string,
        theme : PropTypes.string,
        danger : PropTypes.bool,
        icon : PropTypes.node,
    },
    parameters : {
        docs : {
            // canvas : {sourceState : 'shown'},
            code : {type : 'code'},
        }
    },
    args : {
        children: 'Click Me' ,
        light : true,
        title : 'Hover Clicking Me', 
        bordered: false,
        background: false || '#fff' ,
        disable : false,
        oargs : {},
        progress: false ,
        progressText: 'In Progress',
        progressColor : '#029cfd',
        theme : 'mui' ,
        danger : false ,
        // icon: <img  alt='test' src={TestIcon} />
    }
}

export default meta;

const Template = args => {
    const [ _ , updateArgs ] = useArgs();
    const ref = useRef()
    return <Button {...args} />
}


/**
 * Simple Button based on MUI theme.
 */
export const Basic = Template.bind({})


/**
 * Danger Button
 */
export const Danger = Template.bind({})
Danger.args={
    danger : true
}


export const Bordered = Template.bind({})
Bordered.args={
    bordered : true
}
