// @ts-nocheck

import React , {useEffect, useState , useRef} from 'react'
import $ from 'jquery'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import './styles.css'

const location = {
    x : 0,
    y : 0 
}

export default function BlankContextMenu(props) {

    const contextMenu = useRef()
    const _mainMenuRef  = useRef()


    function handleClickAwayEvent(){
        $(_mainMenuRef.current).hide()
    }

    function handleNewEvent(event){

      if (event == null ){ return }

      $(_mainMenuRef.current).show()

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
      console.log('new event ..')
        handleNewEvent(props.event)
    } , [props.event])


    return (
        <ClickAwayListener onClickAway={handleClickAwayEvent} >
            <div ref={ _mainMenuRef } className='_sk1212' style={{ position : 'relative' , 'display' :  'none' }}>

                <div ref={contextMenu} className="context-menu-wrapper" style={{
                    top : location.y + 10 + 'px' ,
                    left : location.x + 'px' ,
                    overflow:'auto'
                }} 
                >
                    {props.children}

                </div>
            </div>
        </ClickAwayListener>
    )
}
