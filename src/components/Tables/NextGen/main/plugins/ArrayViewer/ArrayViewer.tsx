// @ts-nocheck
import { forwardRef, useEffect , useRef, useState } from "react";
import { ScrollArea } from "@/components/Containers/ScrollArea";
import './styles.css'
import { CloseButton } from "@/components/Buttons/CloseButton";
import { Switch } from "@/components/Buttons/Switch";

export interface ArrayViewerProps {
    header : string
}

export const ArrayViewer= forwardRef<HTMLAreaElement , ArrayViewerProps>( (props) => {
    
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
            else{
                ref.current.classList.remove('css-show-sj212')
            }
        }
    } , [callback.selectedCell])

    return(
        <div ref={ref} className="css-khh123 overflow-auto w-full h-[0px] bg-[#fafafa] absolute bottom-0 left-0 z-10 border-gray-400  px-2 border-[1px] rounded-t-xl">
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
                <ScrollArea className={'h-[255px] w-full overflow-auto flex p-2'}>
                    {
                        rows.map( item => {
                            return <div className="items-center h-[40px] space-x-1 space-y-1 hover:bg-slate-200 p-2 rounded-[5px] text-wrap overflow-auto">
                                <label>{item}</label>
                            </div>
                        })
                    }
                </ScrollArea>
            </div>

        </div>
    )
} )