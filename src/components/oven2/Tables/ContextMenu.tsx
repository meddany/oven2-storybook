
//@ts-nocheck

import React , {useEffect, useState , useRef} from 'react'
import './ag-grid-custom.css'
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import $ from 'jquery'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from '@mui/material/MenuItem';

export default function Contextmenu(props) {

  const [location , setLocation ] = useState(props.location)
  const [visibility , setVisibility ] = useState(props.visibility)
  const [openSubMenu , setOpenSubMenu ] = useState(false)
  const [subMenuItems , setSubMenuItems ] = useState([])
  const contextMenu = useRef()
  const [pinnedItems  , setPinnedItems ] = useState([])
  const subContextMenu = useRef()
  const [subMenuLocation , setSubMenuLocation ] = useState({'x' : 0 , 'y' : 0})

  $(document).on('click' , handleClick )

  function customClasses(item,defaults=''){
    var classes = defaults +" "
    
    if (item.danger == true ){ classes = classes + " danger-menu-item" }

    return classes
  }
  
  const renderSubMenuItem = () => {
    return (
      // <div className="menuitem" key={item.label} onClick={item.action}> <label>{item.label}</label></div>
      <>
        {
          // subMenuItems.map( ( item , index) => <div className="menuitem" key={item.label} onClick={item.action}> <label>{item.label}</label></div>  )
          subMenuItems.map( ( item , index) => <MenuItem  className={customClasses(item , 'menuitem')}  onClick={item.action} key={item.label}>{item.label}</MenuItem>  )
        }
      </>
    )
  }


  const renderMenuItem = (item ,subItems ) => {
    return (
    <MenuItem 
        onMouseOver={(e) => {
          setOpenSubMenu(false)
        
          
          const containerWidth = $(props.container).width()
          const subMenuLocation = $(contextMenu.current).width() + props.location.x
          const delta = containerWidth - subMenuLocation - 200 
          const newXAxis = delta <= 0 ? subMenuLocation - $(contextMenu.current).width()*2  + 20: subMenuLocation
          // console.log(e.target)
          const newYAxis = e.pageY - 20

          if ( subItems !== undefined ) {
            setSubMenuItems(subItems)
            // // console.log(e)
            // // console.log(newYAxis)
            const fn = subMenuItems
            fn.x = newXAxis
            fn.y = newYAxis
            setOpenSubMenu(true)
            setSubMenuLocation(fn)
          }
      }

    }
    className={customClasses(item , 'menuitem')} onClick={item.action} key={item.label}>{item.label}
    {subItems == undefined ? null : <ChevronRightIcon sx={{position : 'absolute' , 'right' : '10px' , 'color' : '#c4c4c4'}} /> }
    </MenuItem>
    
    )
  }


  useEffect( () => {
    setLocation(props.location)
    setHideStatus(props.hide)
    setVisibility('visible')

    props.visibility == 'hidden' ? setOpenSubMenu(false) : null

  } , [props.location , props.hide , props.visibility ] )

 
  useEffect( () => {
    setVisibility(props.visibility)

  } , [props.visibility] )


    useEffect( () => {
      // console.log(props.menuItems)
      
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

      // console.log(fn)
      setPinnedItems(fn)

    } , [props.menuItems])

  function handleClick(){
    setVisibility('hidden')
    setHideStatus('none')
  }

  const [hide , setHideStatus] = useState('none')

  return (
    <div style={{ position : 'relative' , 'display' :  hide }} onClick={handleClick} >
        <div ref={contextMenu} className="context-menu-wrapper" style={{
            top : props.location.y ,
            left : props.location.x ,
            visibility : props.visibility,
            overflow:'auto'
        }} >

            <div className='pinned-top-hor-items'>

              <div className='pinned-icon-holder'>

                { pinnedItems.map( (item , index) =>  
                   <Tooltip key={`_1_`+index} title={item.label} >
                      <div onClick={item.action} key={'_'+item.label} className='icon-holder'>
                        {item.icon == undefined ? item.child :  <img src={item.icon} alt={`_img_${item.label}`} ></img> }
                        {/* <label className='icon-label'>{item.label}</label> */}
                      </div>
                    </Tooltip>
                ) }

              </div>

            </div>



            <div style={{marginTop : '10px'}}></div>
            <Divider />
            
            {
             props.menuItems.map( item => 

              <div key={item.label} >
                  
                  {item.pinned == false || item.pinned == 'both' || item.pinned == undefined ? renderMenuItem(item , item.subItems) : null} 

                  
                  { item.divider ? <Divider /> : null}
              </div>
                 
             ) }
        
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
              {renderSubMenuItem()}
              
          </div> : null

        }




    </div>
  )
}
