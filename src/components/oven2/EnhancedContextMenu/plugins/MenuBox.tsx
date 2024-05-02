// @ts-nocheck
import React, { forwardRef, useEffect, useState , useContext } from 'react';
import EnhancedMenuContext from './Context';
import $ from 'jquery'
import { getRandomId } from '../../commonsjs/common';

function getClasses(options){
  const classes = ['enh-cm-box']

  if (options.animationMotion == 'slide' && options.enableAnimations ){
        classes.push('slide-bottom')
  }
  if (options.animationMotion == 'shadow-drop' && options.enableAnimations ){
        classes.push('shadow-pop-tr')
  }
  return classes.join(' ');
}

const MenuBox = forwardRef(({ options, children , location , id , index , sub }, ref) => {

    const { addSubPaper , tmps , handleClickAwayEvent } = useContext(EnhancedMenuContext)
    const [ fixedLocation , setFixedLocation ] = useState()


    useEffect( () => {

      if (location){
        setFixedLocation({ 'left': location.x, 'top' : location.y})
      }
    } , [location])

    return (
      <div  
        index={index.toString()} 
        sub={sub.toString()} 
        data-menu-childs={[].join(',')} 
        id={id} ref={ref} 
        style={{ opacity: 0  ,background: `var(${options.menuColor})` , ...fixedLocation , pointerEvents:  'none' }} 
        className={getClasses(options)}>
        {children}
      </div>
    );
});

export default MenuBox;