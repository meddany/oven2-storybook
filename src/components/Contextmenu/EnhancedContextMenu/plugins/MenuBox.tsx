// @ts-nocheck
import React, { forwardRef, useEffect, useState , useContext } from 'react';
import EnhancedMenuContext from './Context';

function getClasses(options){
  const classes = ['enh-cm-box']
  if ( options.animationMotion == 'slide' && options.enableAnimations ){
        classes.push('slide-bottom')
  }
  if (options.animationMotion == 'shadow-drop' && options.enableAnimations ){
        classes.push('shadow-pop-tr')
  }
  return classes.join(' ');
}

const MenuBox = forwardRef(({ options, children , location , id  , sub }, ref) => {

    const [ fixedLocation , setFixedLocation ] = useState()
    const [ opacity , setOpacity ] = useState('hidden')

    useEffect( () => {
      
      if (location ){
        setFixedLocation({ 'left': location.x, 'top' : location.y})
      }
      if ( options.locationX ){
        setFixedLocation({ 'left': options.locationX +'px' , 'top' : options.locationY+'px' })
      }
    } , [location , options.locationX ])

    useEffect( () => {
      if ( fixedLocation ){
        
        if ( fixedLocation.top){
          setOpacity(prev => 'visible')
        }
      }
      return () => {
        setOpacity(prev => 'hidden' )
      }
    } , [fixedLocation])

    return (
      <div  
        sub={sub.toString()} 
        data-menu-childs={[].join(',')} 
        id={id} 
        ref={ref} 
        style={{ 
          visibility: opacity  ,
          background: `var(${options.menuColor})` 
          , ...fixedLocation , 
          pointerEvents:  'none', 
          minWidth : options.minWidth  
        }} 
        className={getClasses(options)}>
        {children}
      </div>
    );
});

export default MenuBox;