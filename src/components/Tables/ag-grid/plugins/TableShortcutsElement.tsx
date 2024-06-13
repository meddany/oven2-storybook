// @ts-nocheck
import React, { useEffect , useState   } from 'react'
import { getAllKeyCodes , disableHotkey  } from '../../../utils/hotkeyregister'
import { Stack } from '@mui/material'
import { Headline , Switch , InlineSpinner } from '@/components'
import { callback } from '../callbacks/callback'

import './styles.css'
const TableShortcutsElement = () => {
    const [ items , setItems ] = useState([])
    const [ showSpinner , setShowSpinner ] = useState(true)

    useEffect( () => {
        if (! callback.ready ){ return }
        const allKeyCodes = getAllKeyCodes()
        setItems(prev => allKeyCodes.data )
        const s = setTimeout( () => {
            setShowSpinner(false)
        } , 500)
        return () =>{
            clearTimeout(s)
            setItems( prev => [])
        }
    }, [])

    
    return (
        <div className='w-[30vw] bg-transparent' >
            {
                items.map( (item , index ) => {
                    return(
                        <Stack className='mt-2' spacing={2} justifyContent={'space-between'} key={index} justifyItems={'center'} direction={'row'}>
                            <div style={{display : 'flex' , alignItems: 'center'}}>
                                <Headline padding={10} size='xsmall' >{item.label}</Headline>
                                <p style={{ marginLeft : '10px' ,fontSize : '12px' ,color :'gray'}}>{item.keys.toUpperCase()}</p>
                            </div>

                            <Switch 
                                defaultChecked={ item.enable ? true : false }
                                onChange={(v) => {
                                    console.log(v)
                                    item.enable=v
                                    disableHotkey(item)
                                    callback.saveShortcutsPrefernces()
                                }}
                            />
                            {
                                showSpinner ? <InlineSpinner defaultOpen variant= 'blur' /> : null
                            }
                        </Stack>
                    )
                })
            }
        </div>
    )
}

export default TableShortcutsElement
