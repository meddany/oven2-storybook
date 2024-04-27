// @ts-nocheck
import React , {useContext, useEffect , useMemo, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Stack } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import Headline from '../Headlines/Headline';
import CollapsableContainerContext from './CollapsableContainerContext';
import { getRandomId } from '../commonsjs/common';
import $ from 'jquery'

export default function CollapsableContainer(props) {
    const initialized = useRef(false)
    const ref = useRef()
    const [expanded, setExpanded] = React.useState(false);
    const [ panelname , setPanelname] = useState('panel1') 
    const { currentPanel , updateCurrentPanel } = useContext(CollapsableContainerContext)
    const id = useMemo( () => { return getRandomId() } , [])
    const [ defaults , setDefaults] = useState({
      onClick : () => {} ,
      onOpen : () => {} ,
      onClose : () => {} ,
      onLoad : () => {} ,
      loaded : false 
    })

    useEffect( () => {
      if ( props.onClick ){
        defaults.onClick = props.onClick
      }
      if ( props.onOpen ){
        defaults.onOpen = props.onOpen
      }
      if ( props.onClose ){
        defaults.onClose = props.onClose
      }
      if ( props.onLoad ){
        defaults.onLoad = props.onLoad
      }
    } , [props.onClick , props.onOpen , props.onClose , props.onLoad])

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      if ( updateCurrentPanel ){
        updateCurrentPanel(prev => prev == panel ? '' : panel)
      }
    };


    useEffect(() => {

        if ( props.defaultopen == 'true' ){ setExpanded(panelname);}
        else if ( props.defaultclose == 'true'){setExpanded(false)}
        if ( props.panel ){setPanelname(prev => props.panel)}

    } , [props.defaultopen , props.defaultclose , props.panel ])


    function getCurrentState(){
      const state = expanded == false ? 'open' : 'closed'
      return state 
    }

    function handleOnClick(event){
      if ( defaults.onClick ){
        defaults.onClick(
          props.header, 
          ref , 
          {
          ref : ref , 
          triggerer : 'onClick' , 
          header : props.header ,
          panelname : panelname , id ,
          state : getCurrentState() ,
          isOpen : getCurrentState() == 'open' ? true : false ,
          api : {
            triggerOpen :  () => { setExpanded(panelname) } ,
            triggerClose :  () => { setExpanded(false) } ,
          }
          } ,
        event
      )
      }
    }

    
    function handleOnLoad(event){
      if ( defaults.onLoad){
        defaults.onLoad(
          {
          ref , 
          loadedAlready : initialized.current ,
          event,
          header : props.header ,
          panelname, 
          triggerer : 'onLoad' ,
          id ,
          state : getCurrentState() ,
          isOpen : getCurrentState() == 'open' ? true : false ,
          api : {
            triggerOpen :  () => { setExpanded(panelname) } ,
            triggerClose :  () => { setExpanded(false) } ,
          }
          }
      )
      }
    }

    useEffect( () => {
      if ( ref.current ){handleOnLoad()}
    } , [])


  return (
    <div id={id} ref={ref} style={props.style} className={props.className} onClick={handleOnClick}>
      <Accordion
            sx={{
              border: '1px solid #f5f5f5' ,
            }}
            {...props}
            expanded={ currentPanel ? currentPanel === panelname : expanded === "panel1"  }
            onChange={handleChange(panelname)}
        >
            <AccordionSummary sx={{background : props.color }} >
                <Stack direction='row' spacing={2} >
                    {expanded ? <UnfoldLessIcon /> :   <UnfoldMoreIcon />}
                        {props.header == undefined ? '' : <Headline>{props.header}</Headline>}
                </Stack>
                <Stack sx={{width : '0%'}} direction={'row'} alignItems="center" justifyContent={'center'}> 
                        <Headline color='var(--oven-dark-gray)'>{props.desc == undefined ? '' : props.desc }</Headline>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack>
                    {props.children}
                </Stack>
            </AccordionDetails>
      </Accordion>
      </div>
  )
}
