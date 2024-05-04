// @ts-nocheck
import React , { useEffect , useContext , useState , useRef , forwardRef  } from "react";
import EnhancedMenuContext from "./Context";
import { Stack } from "@mui/material";
import { getIconSideStyle , getClassesForSideBar  } from './SideIcons'
import { MenuItem } from "@mui/material";
import { clearHotkeyRegister , hotkeyRegister, convertToPlusKeys } from '../../../utils/hotkeyregister';
import { ContextMenuSelectBox } from "./ContextMenuSelectBox";
import { NormalMenuItemLabel } from "./NormalMenuItemLabel";
import { MarginBox } from "../../../Containers";
import { Headline } from "../../../Paragraph/Headlines";
import ContextMenuRadioGroups from "./ContextMenuRadioGroups";
function MenuItemHeader(props){
    const { item } = props;
    return (
        <>
        {
            item.header ? 
            <div style={{marginBottom : '10px'}}>
                <Headline size='xsmall' >{item.header}</Headline> 
            </div>
            : <></>
        }
        </> 
    )
}

function getChilds(item , children , requireHotKeyRegister , shortcutKeys  ){
    if ( item.custom == true && item.type == 'select' ) { return <ContextMenuSelectBox item={item} /> }
    if ( item.custom == true && item.type == 'custom' ) { return item.element }
    if ( item.custom == true && item.type == 'radio' ) { return <ContextMenuRadioGroups item={item} /> }
    else{ return <NormalMenuItemLabel requireHotKeyRegister={requireHotKeyRegister} shortcutKeys={shortcutKeys} children={children} />}
} 

function getClassesIU(item){
    const classes = ['custom-mui-dim', 'cm-custom-menu-item' , 'prevent---hide' , 'slide-left']
    if ( item.custom != true ){classes.push('custom-mui-hover-color')}
    return classes.join(' ')
}

export function getStyles(options){
    return {
        fontSize : options.menuItemFontSize ,
        fontFamily: options.menuFontFamily ,
        borderRadius: options.menuItemBorder ,
        pointerEvents: 'all' , 
        paddingTop: 7 ,
        width : '100%',
        height : '100%'
    }
}


export const GlobalMenuItem = forwardRef( ({item , options , index , children , onMouseEnter , onMouseLeave , labelBy , nativeid , groupid , onClick } , ref ) => {
    const { clearEvent , tmps  } = useContext(EnhancedMenuContext)
    const [ requireHotKeyRegister , setRequireHotKeyRegister] = useState('')
    const [ shortcutKeys , setShortcutKeys ] = useState('')
    const style = getStyles(options)
    
    useEffect( () => {
        if ( item.hotkeys ){
            if ( item.hotkeys.extra ){
                setRequireHotKeyRegister( prev => true  )
            }
        }
        return () => {
            setRequireHotKeyRegister( prev => false  )
        }
    } , [item])

    
    useEffect( () => {
        if ( requireHotKeyRegister == false ){ return }
        item.hotkeyUp=true
        const keys = convertToPlusKeys(item.hotkeys.extra , item.hotkeys.key )
        setShortcutKeys( prev => keys.toUpperCase() )

    } , [requireHotKeyRegister])

    function handleOnClick(event){
        if ( item.custom == true ){
            event.stopPropagation()
            return
        }
        else if ( onClick ){
            event.stopPropagation()
            onClick(event , ref )
        }
    }

    if ( item.danger ){
        style.backgroundColor = '#dd3b4b'
        style.color = `#fff` 
    } 
    if ( item.customBgColor ){
        style.backgroundColor = item.customBgColor
    } 
    if ( item.customTextColor ){
        style.color = item.customTextColor
    } 
    if ( options.menuHeight ){
        style.height = options.menuHeight
    } 
    if ( item.custom ){
        style.backgroundColor= 'transparent'
    }
    if ( item.frame ){
        if ( item.frameOptions ){
            const { width , height } = item.frameOptions
            style.width = width
            style.height = height
        }
    }


    return (
        <Stack groupid={groupid} className={getClassesIU(item)} style={{width : '100%' , position: 'relative' , '--hover-color' : options.customHoverColor  }} >  
            <MenuItem
                menu-index={index}
                style={{ height : style.height , width : style.width, position : 'relative'}} 
                ref={ref}
                groupid={groupid}
                nativeid={nativeid}
                onMouseEnter={onMouseEnter ? onMouseEnter : ()=>{}}
                onMouseLeave={onMouseLeave ? onMouseLeave : ()=>{}}
                style={style}
                disableRipple={ item.custom ? true : false }
                disableTouchRipple={ item.custom ? true : false }
                onClick={handleOnClick}
                disabled={ item.disable ? true : false }
            >   
                
                <Stack  style={{ height: style.height   ,width : '100%', position : 'relative'}}>
                    <MenuItemHeader item={item} />
                    { 
                        getChilds(item , children , requireHotKeyRegister , shortcutKeys  ) 
                    }

                </Stack>
            </MenuItem>
        </Stack>
    )
})

