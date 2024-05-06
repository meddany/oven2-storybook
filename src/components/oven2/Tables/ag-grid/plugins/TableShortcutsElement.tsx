// @ts-nocheck
import React, { useEffect , useState   } from 'react'
import { getAllKeyCodes , clearAllHotkeyRegister , clearHotkeyRegister , disableHotkey } from '../../../utils/hotkeyregister'
import { Switch } from '../../../Inputs'
import { Stack } from '@mui/material'
import { Headline } from '../../../Paragraph/Headlines'
import { callback } from '../callbacks/callback'
import './styles.css'
const TableShortcutsElement = (props) => {
    const [ items , setItems ] = useState([])

    useEffect( () => {
        if (! callback.ready ){ return }
        const allKeyCodes = getAllKeyCodes()
        setItems(prev => allKeyCodes.data )
    }, [])

    return (
        <div>
            <Headline color='#3B1C32' size='large' padding={10}>Enable/Disable table hotkeys.</Headline>
            {
                items.map( (item , index ) => {
                    return(
                        <Stack className='ii-on-hover' spacing={2} justifyContent={'space-between'} key={index} justifyItems={'center'} direction={'row'}>
                            <div style={{display : 'flex' , alignItems: 'center'}}>
                                <Headline padding={10} size='xsmall' >{item.label}</Headline>
                                <p style={{ marginLeft : '10px' ,fontSize : '12px' ,color :'gray' , marginTop : '12px'}}>{item.keys.toUpperCase()}</p>
                            </div>

                            <Switch theme='android' 
                                    defaultChecked={ item.enable ? true : false }
                                    onChange={(e,v) => {
                                    item.enable=v
                                    disableHotkey(item)
                                    callback.saveShortcutsPrefernces()
                                }}
                            />
                        </Stack>
                    )
                })
            }
        
        </div>
    )
}

export default TableShortcutsElement
