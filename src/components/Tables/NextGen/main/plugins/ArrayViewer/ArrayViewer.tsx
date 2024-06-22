// @ts-nocheck
import { forwardRef, useEffect , useRef, useState } from "react";
import { ScrollArea } from "@/components/Containers/ScrollArea";
import './styles.css'
import { CloseButton } from "@/components/Buttons/CloseButton";
import { Switch } from "@/components/Buttons/Switch";
import Chip from '@mui/material/Chip';

export interface ArrayViewerProps {
    header : string
}

export const ArrayViewer= forwardRef<HTMLAreaElement , ArrayViewerProps>( (props,ref2) => {
    
    const [ header , setHeader ] = useState('')
    const [ rows , setRows ] = useState([])
    const { callback } = props;
    const ref =  useRef()
    const [ disableView , setDisableView ] = useState(false)

    useEffect( () => {
        if ( callback.ready){
            setHeader( callback.selectedHeader )
        }
    } , [callback])

    useEffect( () => {
        if ( callback.ready ){
            if ( disableView ){ return }
            const cell = callback.selectedCell 
            if ( Array.isArray( cell ) ){
                setRows( cell )
                ref.current.classList.add('css-show-sj212')
            }
            else if( cell?.toString().includes('[') && cell?.toString().includes(']')){
                const data = JSON.parse(cell)
                setRows(data)
                ref.current.classList.add('css-show-sj212')
            }
            else{
                ref.current.classList.remove('css-show-sj212')
            }
        }
    } , [callback.selectedCell])

    return(
        <div ref={ref} className="css-khh123 hidden overflow-auto w-full h-[0px] bg-[#fafafa] absolute bottom-0 left-0 z-10 border-gray-400  px-2 border-[1px] rounded-t-xl">
            <div className="w-full h-[40px] flex items-center font-Roboto font-bold border-b-[1px] border-gray-400 ">
                <div className="flex w-full">
                    { header?.toUpperCase() }
                </div>
                <div className="flex justify-center items-center mr-2">
                    <div className="w-[150px]">
                        <Switch 
                            label="Disable View"
                            onChange={(v)=>{ setDisableView(v) }}
                            defaultChecked={disableView}
                        />
                    </div>

                    <CloseButton 
                        tooltip="Close"
                        onClick={() => {ref.current.classList.remove('css-show-sj212')}}
                    />
                </div>
            </div>
            <div className="spacing-y-2 relative ">
                <ScrollArea className={'h-[255px] w-full overflow-auto flex p-2 space-x-2 space-y-2 flex-wrap'}>
                    {
                        rows.map( item => {
                            return <Chip label={<label className="!font-Roboto">{item}</label>} variant="outlined" className="hover:bg-[#e5effd] hover:!border-blue-500 " />
                        })
                    }
                </ScrollArea>
            </div>

        </div>
    )
} )