// @ts-nocheck
import React , {useState , useContext , useEffect, useRef} from 'react'
import CustomIconButton from '../CustomIconButton/CustomIconButton'
import CollapsableContainer from '../CollapsableContainer/CollapsableContainer'
import Headline from '../Headlines/Headline'
import { Stack } from '@mui/material'
import { getRandomId } from '../utils/common'
import './properties.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { Panel } from 'primereact/panel';

export default function PropertiesPaper(props) {

    const [data , setData ] = useState([])

    useEffect( () => {
        setData(props.data)
    } , [props.data])

    function handleOnClick(header, ref, additionalData , event , onClick , content ) {
        if ( ! event ){ return }
        if (onClick) {
            event.stopPropagation();
            additionalData.content = content
            onClick(header, ref, additionalData)
        }
    }

    function handleOnLoad(api){
        console.log(api.header + ' loaded trigger an action ..')
    }

    function renderSmallStatBox(data){
        let key = getRandomId()

        function copyCell(){ copy( data.value) }

        return (
            <div key={key} className='_jsndsnd'>
                <Stack sx={{paddingLeft : '5px' , paddingRight : '5px'}}>
                    <Headline size='xsmall' color='gray'>{data.header}</Headline>
                    <Headline userselect={true} size='mid' color='black'>{
                        data.value != '' ? data.value : ' -- '
                    }</Headline>
                </Stack>

                <div className='_ksdnsd'>
                    <CustomIconButton styles={{background : ''}} icon={<ContentCopyIcon sx={{fontSize:'12px'}} />} title='copy' onClick={copyCell}/>
                </div>
                    
            </div>

        )

    }

    return (
        <Panel header="Properties">
            {
                data.map( (item, index ) => {
                    const insideData = item
                    const onClick = insideData.onClick
                    const header = Object.keys(insideData)[0]
                    const propertiesContent = insideData[header]       
                    const open =  index == 0 ? 'true' : 'false'
                    let id = getRandomId()
                    return (
                        <CollapsableContainer id={id} 
                            onClick={(header, ref, data , event) => handleOnClick( header , ref , data , event , onClick , propertiesContent  )}
                            defaultopen={open} 
                            onLoad={(api) => { handleOnLoad(api)}}
                            key={index} 
                            style={{marginTop : '10px', color : '#124191'}} 
                            header={header}
                            >
                            <div className='_in2n1j2in'>
                            {
                                propertiesContent.map( ( item ) => {
                                    return(
                                        renderSmallStatBox(item)
                                    )
                                })
                            }
                            </div>
                        </CollapsableContainer>
                    )
                })
            }
        </Panel>
    )
}
