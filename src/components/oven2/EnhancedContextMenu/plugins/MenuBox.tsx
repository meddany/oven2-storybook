// @ts-nocheck
import React, { forwardRef, useEffect, useState , useContext } from 'react';
import EnhancedMenuContext from './Context';
import $ from 'jquery'
import { getRandomId } from '../../commonsjs/common';
const MenuBox = forwardRef(({ options, children , location , id , index , sub }, ref) => {
    const { addSubPaper , tmps , handleClickAwayEvent } = useContext(EnhancedMenuContext)
    const [ fixedLocation , setFixedLocation ] = useState()

    console.log('creating menu box with id ' ,  id )

    function handleMouseEnter(){
      console.log('updating mouse over ..')
      tmps.current.currentOpenMenu = ref.current
    }

    useEffect( () => {
      if (location){
        setFixedLocation({ 'left': location.x, 'top' : location.y})
      }
    } , [location])

    return (
      <div sub={sub.toString()} onScroll={handleClickAwayEvent} data-menu-childs={[].join(',')} onMouseEnter={handleMouseEnter} id={id} ref={ref} style={{ opacity: 0  ,background: `var(${options.menuColor})` , ...fixedLocation }} className="enh-cm-box">
        {children}
      </div>
    );
});

export default MenuBox;