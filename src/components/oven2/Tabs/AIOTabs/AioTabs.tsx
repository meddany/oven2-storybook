// @ts-nocheck
import React, { createContext, useRef , useState  , useEffect , useContext } from 'react'
import { Stack } from '@mui/material'
import NativeTabs from '../NativeTabs/NativeTabs'
import './styles.css'
import $ from 'jquery'
import { getRandomId } from '../utils/common'
import MuiTabs from '../MuiTabs/MuiTabs'

export const TabsContext = createContext(null)

const Body = ( {children  } ) => {
    const { options } = useContext(TabsContext)
    return (
        <Stack style={{height : options.bodyHeight }} className='aio-tabs-body'>
            {children}
        </Stack>
    )
}

const RenderVirtualItems = ({items}) => {
    const { options } = useContext(TabsContext)
    if ( ! options.addTabsBody ){
        return <></>
    }
    return ( 
        <>
        {
            items.map( (item , index ) => {
                return item.element
            } )
        }
        </>

    )
}

const RenderOnSpotBodyElement = ({element}) => {
    return ( 
        <>
        {element}
        </>
    )
}


const getRenderedTemplate = ( element , id ) => {
    return {
        id : id ,
        element : 
            <div 
                className='aio-virt-box toggle' style={{display: 'none' }} 
                id={id} >{element}
            </div>
    }
}

export default function AioTabs({theme, virtualization , callback , data , addTabsBody , bodyHeight , center  }) {

    const mainRef = useRef(null)
    const tmps = useRef({})
    const [ inViewElement , setInViewElement ] = useState(<></>)
    const [ store  , setStore ] = useState({})
    const [ themeIsValid , setThemeIsValid ] = useState(false)
    const [ vritualItems , setVirtualItems ] = useState([])
    const [ options , setOptions ] = useState({
        data : [] ,
        virtualization : virtualization ? virtualization : false ,
        theme : theme ? theme : 'native' ,
        callback : callback ? callback : {},
        bodyHeight : bodyHeight ? bodyHeight : '100vh' ,
        addTabsBody : addTabsBody ? addTabsBody : false ,
        center : center ? center : false ,
        themes : ['native' , 'mui']
    })

    function updateInVeiwElement(element){
        setInViewElement(prev => element )
    }

    function toggleVirtualBodyElement(tab){
        // console.log('toggling ' , tab.id )
        updateInVeiwElement(<></>)
        $('.aio-virt-box').hide()
        if (tab.virtualization ){
            $(`#${tab.id}`).show()
        }
    }

    function getElemenyById(id) {
        return document.getElementById(id)
    }

    useEffect( () => {
        console.log('theme changed to ' , theme )
    } , [theme])

    useEffect( () => {
        if ( ! options.themes.includes(theme)){return}
        if ( data && virtualization ){
            data.map( ( item , index ) => {
                if ( ! item.virtualization ){ return }
                const id = getRandomId()
                const tmp = getRenderedTemplate(item.body ,id )
                item.id = id
                item.document = () => { return getElemenyById(id)}
                item.jquery =  () => { return  $(getElemenyById(id)) } 
                setVirtualItems( prev => ([...prev , tmp  ]))
                setThemeIsValid(true)
            })
        }
        if ( data ){
            setOptions( prev => ({...prev , data }))
        }

        return () => {
            setThemeIsValid(false)
            $('.aio-virt-box').remove()
        }

    } , [ virtualization , data, theme  ])


    function triggerOnSelectEvent(tab){
        if ( tab.onSelected && ! tab.clickOnly ){
            tab.onSelected(tab)
        }
    }

    function handleOnChange( tab  ){
        if ( tab.clickOnly ){ return }
        triggerOnSelectEvent(tab)
        if ( options.virtualization && addTabsBody ){
                if( ! tab.virtualization ){
                    toggleVirtualBodyElement(tab)
                    updateInVeiwElement(tab.body)
                }
                else {
                    toggleVirtualBodyElement(tab)
                }
        }
        else if( ! options.virtualization && addTabsBody ){
            updateInVeiwElement(tab.body)
        }
    }

    return (
        <TabsContext.Provider value={{options , virtualization , updateInVeiwElement , AioOptions : options }}>
            <div ref={mainRef}>
                { theme === 'native' && themeIsValid ? <NativeTabs onChange={handleOnChange} data={options.data} /> :  null }
                { theme === 'mui' && themeIsValid ?  <MuiTabs onChange={handleOnChange} data={options.data} /> :  null }
                <Body>
                    <RenderVirtualItems items={vritualItems} />
                    <RenderOnSpotBodyElement element={inViewElement} />
                </Body>
            </div>
        </TabsContext.Provider>

    )
}