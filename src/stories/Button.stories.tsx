// @ts-nocheck
import { OvenButton } from '../components/oven2/Oven'
import PropTypes from 'prop-types';
import { useArgs } from '@storybook/store';
import TestIcon from '../img/icon.png'
import { useRef } from 'react';
export default {
    title : 'OvenButton' , 
    component : OvenButton  , 
    argTypes : { onClick : { action : 'handleClick' } },
}




const Template = args => {
    const [ _ , updateArgs ] = useArgs();
    const ref = useRef()
    return(
        <OvenButton
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
    icon: <img src={TestIcon} />
}
