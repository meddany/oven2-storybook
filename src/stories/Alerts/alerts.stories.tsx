// @ts-nocheck
import React , {useRef,useState } from 'react';
import { Body , Frame , Alert, Button } from '@/components';
import { useRandomId } from '@/components';

export default {
  title: 'Components/Alerts',
  component: Alert,
  args: {
    // children: 'SOME CONTENT IS GOING HERE.'
  },
} 

const s = useRandomId();
const b = `
151.98.30.91]-[DEBUG]:  
            =========================
            +command = 'docker exec -u root otncore bash -c "  grep -A1 'name="com.nokia.nfmt"' /nfmt/app/1350OMS/NMA/SNMP_AH/nfmt/config/logback.xml  | awk -F'level="' '{print $2}' | awk -F'"' '{print $1}' " '
                -stdout =
                -stderr = } | awk -F' '{print }' : -c: line 0: unexpected EOF while looking for matching''
`

const Template = (args) => {
    const ref = useRef()
    const [ dialog , setDialog ] = useState({})

    const handleOnClick= (extra) => {
        setDialog({ 
            id : useRandomId() ,
            body : "Please consider this as a long message because we are trying to check the actual width ???",
            autoDecline :false,
            type : extra.type,
            autoAccept : true ,
            // acceptButtonParams : { variant : 'primary'} ,
            // declineButtonParams : { variant : 'primary'} ,
            extraButtons : [
                // <Button>TEST</Button>
            ] ,
            // warning : 'Please think twince ..' ,
            onAccept : () => {
                console.log('dialog accepted')
            } ,
            onDecline : () => {
                console.log('dialog declined.')
                setDialog( )
            },
            ...extra,
         })
    } 

    return (
        <Frame>
            <Body padding>
                <div className='w-full flex space-x-2 '>
                    <Button className='z-[3000000000000000000]' onClick={()=>{handleOnClick({confirm : true })}} > SHOW CONFIRMATION </Button>
                    <Button variant='green' onClick={()=>{handleOnClick({ success : true })}}> SHOW SUCCESS </Button>
                    <Button variant='primary' onClick={()=>{handleOnClick({ alert : true })}}> SHOW ALERT </Button>
                    <Button variant='danger' onClick={()=>{handleOnClick({  autoAccept : false , error : true })}}> SHOW ERROR </Button>
                </div>
                <Alert {...args} ref={ref} dialog={dialog} />
            </Body>
        </Frame>
    ) 
}

export const BodyBasic = Template.bind({});

export const Primary = Template.bind({});
Primary.args={
}

