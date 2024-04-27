// @ts-nocheck

import { Drawer } from 'rsuite';
import React, { useEffect , useContext }  from 'react'
import { Stack } from '@mui/material';
import './sidebar-oven.css'
import Headline from '../Headlines/Headline';
import '../colors/palette.css'

const BottomDrawer = (props) => {
    const [size, setSize] = React.useState('md');

    useEffect( () => {
        if (props.size ){
            setSize(props.size)
        }
    } , [props.size])


    return (
        <Stack style={{position:'absolute'}} className='oven-drawer-bottom-wrapper' >
            <Stack className='css-bj3h12n1' direction={'row'} alignItems={'center'} >
                <Headline padding={20} size='mid' >{props.header}</Headline>
            </Stack>
            <Stack className='css-j2hi1212'>
                {props.children}
            </Stack>
        </Stack>
    )
}

export default BottomDrawer
