// @ts-nocheck
import React , {forwardRef, useContext , useState, useEffect , useRef, useMemo , createContext} from 'react'
import './styles.css'
import { Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { MarginBox } from '../../Containers'
import { Headline } from '../../Paragraph/Headlines'
import Modal from '@mui/material/Modal';
import { getRandomId } from '../../utils/common';

export const DialogPaper = forwardRef( (props,ref) => {
    const { bgcolor , style , children, callback , open } = props;
    const id= useMemo( () => {return getRandomId()} , [])
    const [ childs , setChilds ]= useState(<></>)
    const [ isOpen , setOpen ] = useState(false)
    const defaults = useRef({
        ref : ref ? ref : useRef() ,
        bgcolor : bgcolor ? bgcolor : undefined ,
        isOpen : open ? open : false
    })

    useEffect( () => {
        setOpen( open )
    } , [open])

    const api = {
        defaults : defaults ,
        updateOption : (key , value) => {
            defaults.current[key] = value
        },
        id: id ? id : undefined ,
        ref: defaults.current.ref ,
        open : () => {
            setOpen(true)
        } ,
        close : () => {
            setOpen(false)
        } ,
        updateChildren : (element) => {
            if(!element){element = <></>}
            setChilds(prev => element)
        }
    }

    useEffect( () => {
        setChilds( prev => children )
    } , [children])

    useEffect( () => {
        callback.current.api = api
    } , [callback])



    return (
        <>
            {
                isOpen ? 
                <div id={id} ref={defaults.current.ref}>
                    <Modal 
                        open={true}
                        onClose={api.close}
                        sx={{backgroundColor : defaults.current.bgcolor , display : 'flex', justifyContent : 'center' , alignItems : 'center'}}
                    >
                        {childs}
                    </Modal>
                </div>
                : null
            }
        </>
    )
})
