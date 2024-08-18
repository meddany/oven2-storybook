// @ts-nocheck
import { forwardRef, useEffect, useState , useRef } from "react";
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { GripHorizontal } from "lucide-react";
import { useRandomId } from "../utils/utils";

export const TTextArea = forwardRef( (props,ref) => {
    const id = useRandomId()
    const [initialPos,   setInitialPos] = useState(null);
    const [initialSize, setInitialSize] = useState(null);
    const [initialPosW,   setInitialPosW] = useState(null);
    const [initialSizeW, setInitialSizeW] = useState(null);
    
    const { 
        resize='both'
    } = props

    const initial = (e,dir) => {
        let resizable = document.getElementById(id);
        if ( resize == 'both'){
            if ( dir == 'y'){
                setInitialPos(e.clientY);
                setInitialSize(resizable.offsetHeight);
            }
            if ( dir == 'x'){
                setInitialPosW(e.clientX);
                setInitialSizeW(resizable.offsetWidth);
            }
        }
    }

    const hresize = (e,dir) => {
        let resizable = document.getElementById(id);
        if ( resize == 'both'){
            if ( dir == 'y'){
                resizable.style.height = `${parseInt(initialSize) + parseInt(e.clientY - initialPos)}px`;
            }
            if ( dir == 'x'){
                resizable.style.width = `${parseInt(initialSizeW) + parseInt(e.clientX - initialPosW)}px`;
            }
        }
    }

    
    return (
        <div className="relative">
            <Textarea 
                ref={ref}
                id={id}
                className="resize-none font-Roboto focus:outline focus:outline-[2px] focus-visible:ring-[1px] border-[2px] outline-blue-600 min-h-[40px] min-w-[120px]"
                {...props}
            />
            {   resize == 'both' ? 
                <div 
                    className="w-full cursor-n-resize rounded-xl flex justify-center items-center opacity-40 hover:opacity-100"
                    draggable
                    onDragStart={(e)=>{initial(e,'y')}}
                    onDrag={ (e)=>{hresize(e,'y')} }
                >
                
                    
                    <div className="w-4 h-3 bg-[#e4e4e7] relative -top-[7px] rounded flex items-center justify-center ">
                        <GripHorizontal size={12} />
                    </div>

                </div>
                :
                null
            }

            {   resize == 'both' ? 
                <div 
                    className="h-full cursor-w-resize rounded-xl flex justify-center items-center absolute top-0 -right-[8px] opacity-40 hover:opacity-100"
                    draggable
                    onDragStart={(e)=>{initial(e,'x')}}
                    onDrag={ (e)=>{hresize(e,'x')} }
                >
                
                    
                    <div className="w-4 h-3 bg-[#e4e4e7] rounded flex items-center justify-center rotate-[90deg]">
                        <GripHorizontal size={12} />
                    </div>

                </div>
                :
                null
            }

        </div>

    )
})