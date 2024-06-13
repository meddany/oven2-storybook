import React , {useEffect, useState} from 'react'
import $ from 'jquery'

export default function useMouseLocation(event,menuRef) {
  const [ location , setLocation ] = useState({x: 0, y: 0})

  useEffect( () => {
    if(!event){return}
    if(!menuRef.current){return}
    const loc = {x: event.clientX, y: event.clientY}
    const menu = menuRef.current
    const screenW = window.innerWidth
    const mW = $(menu).width() 
    const deltaw = screenW - ( event.clientX + mW )
    const screenH = window.innerHeight
    const mH = $(menu).height() 
    const deltah = screenH - ( event.clientY + mH )
    if ( deltaw <= 20 ){loc.x = event.clientX + deltaw - 30}
    if ( deltah <= 20 ){loc.y = event.clientY + deltah - 30}

    setLocation(loc)
  } , [event,menuRef])

  return [location , setLocation]
}
