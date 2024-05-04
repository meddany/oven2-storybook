// @ts-nocheck
import PropTypes from 'prop-types';
import { useArgs } from '@storybook/store';
import TestIcon from '../../img/icon.png'
import { useRef } from 'react';
import { Button }from '../../components/oven2'

export default {
    title : 'Button' , 
    component : Button  , 
    argTypes : { onClick : { action : 'handleClick' } },
}


const Template = args => {
    const [ _ , updateArgs ] = useArgs();
    const ref = useRef()
    return(
        <Button
            ref={ref}
            {...args} 
            onClick={(e) => {
                updateArgs({ 'progress' : true })
                setTimeout( () => {
                    ref.current.updateParams(prev => ({...prev , progress : false }))
                } , 3000)
            }}
        />
    )
} ;

export const MuiButton = Template.bind({})


MuiButton.args = {
    children: 'Click Me' ,
    light : true,
    title : 'Hover Clicking Me', 
    bordered: true,
    background: false ,
    disable : false,
    oargs : {},
    progress: false ,
    progressText: 'In Progress',
    progressColor : '#029cfd',
    theme : 'mui' ,
    icon: <img src={TestIcon} />
}
