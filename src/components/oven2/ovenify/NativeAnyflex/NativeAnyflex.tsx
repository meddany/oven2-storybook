//@ts-nocheck

import { useEffect, useState  } from 'react'
import { Modal,  Row,  Text } from "@nextui-org/react";
import InfoIcon from '@mui/icons-material/Info';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NativeAnyflex.css'
import OvenButton from '@/oven/OvenButton/OvenButton';
import { useOvenify } from '../OvenGlobalState';

const NativeAnyflex = (props) => {

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const [anydata , setAnyData] = useState({'header' : '' , 'body' : '' , onAccept: () => {} , onDecline: () => {}  });
  const [type , setType] = useState('confirm')
  const [acceptButton, setAcceptButton] = useState('Yes')
  const [declineButton, setDeclineButton] = useState('Cancel')
  const [borderColor , setBorderColor] = useState('#0b3f87')
  const [queue , setQueue] = useState([])
  const ovenify = useOvenify()


  const anyConfirm = function(info){

    if (info.acceptButton === undefined){
      setAcceptButton("Yes")
    }
    else {
      setAcceptButton(info.acceptButton)
    }

    if (info.declineButton === undefined){
      setDeclineButton("Cancel")
    }
    else {
      setAcceptButton(info.declineButton)
    }


    if (info.header === undefined){
      anydata.header = 'Confirmation'
    }
    else {
      anydata.header = info.header
    }

    
    anydata.body = info.body
    anydata.onAccept = info.onAccept
    anydata.onDecline = info.onDecline
    if ( anydata.onDecline == undefined ) {
      anydata.onDecline = () => {}
    }
    

    setBorderColor('#0b3f87')
    setType('confirm')
    setAnyData(anydata)
    setVisible(true)
  }


  const anyNotify = function(message , mode){

    const options = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: undefined,
      theme: "dark",
      }

    if ( mode === undefined){toast(message, options )}
    else{toast[mode](message, options )}

    
  }

  const anySuccess = function(info){

    const f = () => {
      if (info.acceptButton === undefined){
        setAcceptButton("OK")
      }
      else {
        setAcceptButton(info.acceptButton)
      }
    
      if (info.header === undefined){
        anydata.header = 'Success'
      }
      else {
        anydata.header = info.header
      }
  
  
      anydata.body = info.body
      anydata.onAccept = () => {
        const fa = queue
        fa.shift()
        setQueue(fa)
        setTimeout( () => {if(queue.length != 0) {queue[0]()} } , 50)
      }
  
      setBorderColor('#2ead8b')
      setType('alert')
      setAnyData(anydata)
      setVisible(true)
    }


    var q = addToQueue(f)
    return q


  }


    const anyError = function(info){

    const f = () => {
      if (info.acceptButton === undefined){
        setAcceptButton("OK")
      }
      else {
        setAcceptButton(info.acceptButton)
      }
    
      if (info.header === undefined){
        anydata.header = 'Error'
      }
      else {
        anydata.header = info.header
      }
  
  
      anydata.body = info.body
      anydata.onAccept = () => {
        const fa = queue
        fa.shift()
        setQueue(fa)
        setTimeout( () => {if(queue.length != 0) {queue[0]()} } , 50)
      }
  
      setBorderColor('#c31331')
      setType('alert')
      setAnyData(anydata)
      setVisible(true)
    }


    var q = addToQueue(f)
    return q


  }

  const addToQueue = (f) => {
    const fn = queue
    fn.push(f)
    setQueue(fn)
    if( fn.length == 1 ){
      queue[0]()
    }
    return fn
  }

  const anyAlert = function(info){
      const f = () => {
        if (info.acceptButton === undefined){
          setAcceptButton("OK")
        }
        else {
          setAcceptButton(info.acceptButton)
        }
    
        if (info.header === undefined){ 
          anydata.header = 'Notification'
        }
        else {
          anydata.header = info.header
        }
    
        anydata.body = info.body
        anydata.onAccept = () => {
          const fa = queue
          fa.shift()
          setQueue(fa)
          setTimeout( () => {if(queue.length != 0) {queue[0]()} } , 50)
        }
    
        setType('alert')
        setBorderColor('#0b3f87')
        setAnyData(anydata)
        setVisible(true)
      }    
    var q = addToQueue(f)
    return q

  }

  useEffect( () => {
    if ( ovenify.ready == true ){
      ovenify.alerts.NativeAnyflex = {}
      ovenify.alerts.NativeAnyflex.confirm = anyConfirm
      ovenify.alerts.NativeAnyflex.notify = anyNotify
      ovenify.alerts.NativeAnyflex.success = anySuccess
      ovenify.alerts.NativeAnyflex.error = anyError
      ovenify.alerts.NativeAnyflex.alert = anyAlert
    }

  } , [ovenify.ready])



  return (
    <div>

    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


      <Modal 
        style = {{
          borderRadius : '2px' ,
          borderTop : `7px solid ${borderColor}`,
          pointerEvents : 'none'
        }}
        // blur
        className='custom-he-anyflex'
        aria-labelledby="modal-title"
        open={visible}
        // onClose={closeHandler}
      >
          <Modal.Header>
            <Text b size={18} style={{fontFamily:'Roboto' , width:'90%' ,  overflowWrap: 'break-word' }}>{anydata.header}</Text>
          </Modal.Header>


          <Modal.Body>
            <Row  >
              <InfoIcon style={{'color' : '#0b3f87' , marginTop : '10px' , width : '30px' , marginRight : '10px'}}/>
              <Text style={{fontFamily:'Roboto' }} size={14} >{anydata.body}</Text>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            {type === 'confirm' ? <OvenButton onClick={() => {
              anydata.onDecline()
              setVisible(false)
            }} light >{declineButton}</OvenButton> : null }
          
            <OvenButton light onClick={() => {
              if (anydata.onAccept != undefined){
                anydata.onAccept()
              }
              
              setVisible(false)
            }} >{acceptButton}</OvenButton>

          </Modal.Footer>
      </Modal>
    </div>
  );


  
}


export default NativeAnyflex