// @ts-nocheck
import React, { forwardRef, useState , useRef, useEffect } from 'react'
import {ScrollArea} from '../../../Containers/ScrollArea'
import { PinnedMenuItem } from './MenuItems'
import $ from 'jquery'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { MenuItem } from './MenuItems'
import useBoxSize from '../hooks/useBoxSize'
import { useRandomId } from '../../../utils/utils'
// import { Label } from '@radix-ui/react-label'
import { Label } from '@/components'

const vrs = cva(
    "min-w-[240px] p-0 overflow-hidden" ,
    {
        variants : {
            border : {
                sm : "rounded-[1px]",
                mid : "rounded",
                lg : "rounded-[10px]",
                xlg : "rounded-[15px]",
                xxlg : "rounded-[20px]",
                xxxlg : "rounded-[25px]",
            }
        } ,
        defaultVariants : {
            border : 'sm'
        }
    }
)

export const MenuBox = forwardRef( (props, ref ) => {

    const menuRef = useRef()
    const { variant , id ,items , location ,border , modelRef, role , fixedLocation } = props;
    const [data , setData] = useState([])
    const [ msize ] = useBoxSize(menuRef)
    const [ showSubMenu , setShowSubMenu] = useState( null )
    const [ subMenuLocation , setSubMenuLocation] = useState({x: 0, y: 0})
    const [ mainMenuLocation , setMainMenuLocation] = useState()
    const [ subItems , setSubItems] = useState([])
    const [ title , setTitle ] = useState( null )

    useEffect( () => {
        if ( items ){
            if ( items.items ){
                setData(prev=>items.items)
            }
            if ( role == 'main'){
                if ( items.title ){
                    setTitle( items.title )
                }
            }
        }
    }, [items])

    const handleOnClick=(e,item)=>{
        if ( item.action && !item.subItems ){
            modelRef.current.close()
            item.action()
        }
    }

    useEffect( () => {
        if (fixedLocation){
            setMainMenuLocation(fixedLocation)
        }
        else {
            if ( location ){
                setMainMenuLocation( location )
            }
        }
    } , [location , fixedLocation])

    const locateMenuOnScreen = (loc) => {
        console.log(loc)
        if ( fixedLocation ){
            return fixedLocation
        }
        const menu = document.getElementById(id)
        if(!menu){return}
        const rect = menu.getBoundingClientRect();
        const screenW = window.innerWidth
        const deltaw = screenW - (rect.x + (msize.x*2) + 10 )
        if ( deltaw <= 10 ){
            loc.x = -loc.x 
        }
        return loc
    }

    const handleOnHover=(e,item)=>{
        if(! item.subItems){ 
            setShowSubMenu(false)
            return
         }
        if ( ! item.disabled){
            const loc = {
                x : msize.x - 10 ,
                y :  title && role == 'main' ? e.target.offsetTop + 70 : e.target.offsetTop
            } 
            const nloc = locateMenuOnScreen(loc)
            setSubMenuLocation(nloc)
            setSubItems( item.subItems )
            setShowSubMenu(true)
        }
    }
    
    const updateMenuLocation = ({x,y}) => {
        if ( ref ){
            if ( ref.current ){
                $(ref.current).css('transform', 'translate(' + x + 'px,' + y + 'px)');
            }
        }
    }

    return (
        <div ref={ref} id={id} className='shadow-lg bg-transparent absolute top-0 left-0' style={{transform : `translate(${mainMenuLocation?.x}px,${mainMenuLocation?.y}px)`, opacity: role == 'main' ? 0 : 1 }}>
            <div ref={menuRef} >
                <Card className={cn(vrs({variant,border}))} >
                    <CardContent className='w-full p-1'>
                        {
                            role == 'main' ?
                                title  ? 
                                <div className='w-full border-b'>
                                    <Label className='text-lg p-3 font-medium'>{title}</Label>
                                </div>
                                : 
                                null
                            : null
                        }
                        <PinnedMenuItem 
                            onClick={handleOnClick}  
                            border={border} 
                            pinned={true} 
                            items={data ? data?.filter( item => item.pinned || item.pinned == 'both' ) : []} 
                        />
                        
                        <div className='w-full h-auto' >
                            <ScrollArea className='relative max-h-[70vh] overflow-auto' >
                                { data ? 
                                    data.map( ( item , index ) => {
                                        const id = useRandomId()
                                        return <MenuItem 
                                                    menuRef={menuRef} 
                                                    key={index} 
                                                    type={item.type}
                                                    size={item.size} 
                                                    label={item.label} 
                                                    onClick={handleOnClick} 
                                                    onHover={(e)=>{handleOnHover(e,item)}} 
                                                    seperator={item.seperator} 
                                                    disabled={item.disabled}
                                                    shortcut={item.shortcut}
                                                    subItems={item.subItems}
                                                    msize={msize}
                                                    item={item}
                                                    border={border}
                                                    id={id}
                                                    danger={item.danger}
                                                    icon={item.icon}
                                                />
                                    } ) : null
                                }
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {
                showSubMenu  ? 
                    <MenuBox id={useRandomId()} modelRef={modelRef} role='sub' border={border} location={subMenuLocation} items={{items:subItems , title : title }} />
                : null
            }

        </div>
    )
})  