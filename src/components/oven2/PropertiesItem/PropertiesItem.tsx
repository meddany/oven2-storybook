// @ts-nocheck
import React  from 'react'
import "./styles.css"
import Headline from '../Headlines/Headline';
import { Stack } from '@mui/material';
import { getRandomId } from '../utils/common';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import CustomIconButton from '../CustomIconButton/CustomIconButton';

export default function PropertiesItem(props) {

    function copyCell(){
        copy( props.value) ;
    }
    let key = getRandomId()

    return (
        <div key={key} className='_jsndsnd' style={{border : props.border ? '1px solid #ebecf0' : '' , padding : '5px 5px 5px 5px' , borderRadius : '3px'}} >
            <Stack sx={{paddingLeft : '5px' , paddingRight : '5px'}}>
                <Headline size='xsmall' color='gray'>{props.header}</Headline>
                <Headline userselect={true} size='mid' color='black'>{
                    props.value != '' ? props.value : ' -- '
                }</Headline>
            </Stack>

            <div className='_ksdnsd'>
                <CustomIconButton styles={{background : ''}} icon={<ContentCopyIcon sx={{fontSize:'12px'}} />} title='copy' onClick={copyCell}/>
            </div>
            
        </div>
    )
}
