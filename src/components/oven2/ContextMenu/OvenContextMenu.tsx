
//@ts-nocheck

import React , {useEffect, useState , useRef} from 'react'
import './style.css'
import Divider from '@mui/material/Divider';
import $ from 'jquery'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from '@mui/material/MenuItem';
import MarginBox from '../MarginDiv/Margin';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Stack } from '@mui/material';
import CustomIconButton from '../CustomIconButton/CustomIconButton';

const location = {
  x : 0,
  y : 0 
}

export default function OvenContextmenu(props) {

  const [openSubMenu , setOpenSubMenu ] = useState(false)
  const [subMenuItems , setSubMenuItems ] = useState([])
  const contextMenu = useRef()
  const [pinnedItems  , setPinnedItems ] = useState([])
  const subContextMenu = useRef()
  const [subMenuLocation , setSubMenuLocation ] = useState({'x' : 0 , 'y' : 0})
  const _mainMenuRef  = useRef()

  function customClasses(item,defaults=''){
    var classes = defaults +" "
    
    if (item.danger == true ){ classes = classes + " danger-menu-item" }

    return classes
  }

  
  const renderSubMenuItem = () => {
    return (
      <>
        {
          subMenuItems.map( ( item , index) => {
            return(
              <MenuItem 
                className={customClasses(item , 'menuitem default-haj32')}  
                onClick={() => {
                  item.action()
                  handleClickAwayEvent()

                }} 
                disabled={item.disable}
                key={index}>

                  {item.label}

              </MenuItem> 
            )
          } )
        }
      </>
    )
  }


  const renderMenuItem = (item ,subItems ) => {

    return (
      <MenuItem 
          className={customClasses(item , 'menuitem default-haj32')} 
          disabled={item.disable}  
          onClick={() => {
            item.action()
            handleClickAwayEvent()
          }} 
          key={item.label}
          onMouseOver={(e) => {
            setOpenSubMenu(false)
            const containerWidth = $(_mainMenuRef.current).width()
            const subMenuLocation = $(contextMenu.current).width() + location.x
            const delta = containerWidth - subMenuLocation - 200 
            const newXAxis = delta <= 0 ? subMenuLocation - $(contextMenu.current).width()*2  + 20: subMenuLocation
            const newYAxis = e.pageY - 20
            if ( subItems !== undefined ) {
              setSubMenuItems(subItems)
              setOpenSubMenu(true)
              setSubMenuLocation(prev => ({x: newXAxis , y: newYAxis }))
            }
        }

      }
        >
          <Stack direction={'row'}>
            {item.label}
            {subItems == undefined ? null : <ChevronRightIcon sx={{position : 'absolute' , 'right' : '10px' , 'color' : '#c4c4c4'}} /> }
          </Stack>
      </MenuItem>
    )
  }

  function handleNewEvent(event){

      setOpenSubMenu(false)

      if (event == null ){ return }

      $(_mainMenuRef.current).show()
      
      // var loc = {'x' : 0 , 'y' : 0}

      const menuWidth = $(contextMenu.current).width()
      const menuHeight = $(contextMenu.current).height()
      const containerheight = $('body').height()
      const containerWidth = $('body').width()
      const deltaX = containerWidth - event.pageX
      const deltaY =  containerheight -  event.pageY

      if ( deltaX < menuWidth + 30 ){
        location.x = event.pageX - ( menuWidth )
      }
      else {
        location.x = event.pageX
      }

      if ( deltaY < menuHeight + 30 ){
        location.y = event.pageY - ( menuHeight )
      }
      else {
        location.y = event.pageY
      }
  }


  useEffect( () => {
    handleNewEvent(props.event)
  } , [props.event])



  function handleClickAwayEvent(){
    $(_mainMenuRef.current).hide()
  }


  useEffect( () => {
    const fn = []
    for (let key in props.menuItems) {
      const item1 = props.menuItems[key]
      if (item1.pinned == 'both' || item1.pinned == true ){
        fn.push(item1)
      }
      if ( item1.subItems != undefined ){
        for ( let key2 in item1.subItems){
          const item2 = item1.subItems[key2]
          if ( item2.pinned == 'both' || item2.pinned == true ){
            fn.push(item2)
          }
        }
      }

    }
    setPinnedItems(fn)

  } , [props.menuItems])


  return (

    <ClickAwayListener onClickAway={handleClickAwayEvent} >

      <div ref={ _mainMenuRef } style={{ position : 'relative' , 'display' :  'none' }}>
        <div ref={contextMenu} className="context-menu-wrapper" style={{
            top : location.y + 10 + 'px' ,
            left : location.x + 'px' ,
            overflow:'auto'
        }} >

            <div className='pinned-top-hor-items'>
              <div className='pinned-icon-holder'>
                { 
                  pinnedItems.map( (item , index) =>  {
                    return(
                        <CustomIconButton 
                          key={index}
                          onClick={ () => {
                            handleClickAwayEvent()
                            item.action()
                          }}
                          icon={item.child}
                          title={item.label}
                          disable={item.disable}
                        />
                      )}
                    ) 
                }

              </div>
            </div>
              
            <MarginBox margin={5} />
            <Divider />
            
            {
             props.menuItems.map( item => 
              {
                return(
                  <div key={item.label} >
                      {item.pinned == false || item.pinned == 'both' || item.pinned == undefined ? renderMenuItem(item , item.subItems) : null} 
                      { item.divider ? <Divider /> : null}
                  </div>
                )
              }
              ) 
             }
        
        </div>

        {

          openSubMenu == true ? 
              <div ref={subContextMenu} className="context-menu-wrapper" style={{
                top :  subMenuLocation.y ,
                left : subMenuLocation.x ,
                overflow:'auto' ,
                'transform' : 'translateY(-50%)'
               }} 
               onMouseLeave= {() => setOpenSubMenu(false )}
               >
              { renderSubMenuItem() }
              
          </div> : null

        }

      </div>

    </ClickAwayListener>
  )
}
