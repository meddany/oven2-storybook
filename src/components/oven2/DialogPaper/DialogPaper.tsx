// @ts-nocheck
import React , {useContext} from 'react'
import './styles.css'
import GlobalContext from '@/components/Contexts/GlobalContext'
import { Stack } from '@mui/material'
import CustomIconButton from '../CustomIconButton/CustomIconButton'
import Headline from '../Headlines/Headline'
import CloseIcon from '@mui/icons-material/Close';
import MarginBox from '../MarginDiv/Margin'

export default function DialogPaper(props) {
    const {anyflex , anyloading , setDialogOptions } =useContext(GlobalContext)


    function _handleClose(){
        setDialogOptions(prev => ({...prev , open : false , content : null}) )
    }

    
    return (
        <div style={props.style} className={'dialog-paper' + " "+props.className} >
            <Stack className='_jhj2n123' direction={'row'} alignItems={'center'} >
                <MarginBox margin={10} />
                <Headline color='black' padding={10} size='mid' >{props.header}</Headline>
                <MarginBox margin={10} />
                <div className='_jsj123'>
                    <CustomIconButton 
                        title='Close' 
                        onClick={(e) => {_handleClose()}}
                        icon={<CloseIcon />}
                    />
                </div>


            </Stack>

            <div className='_jeh123'>{props.children}</div>
            
        </div>
    )
}
