// @ts-nocheck
import { forwardRef } from "react";
import { ToasterSideColor } from "./ToasterSideColor";
import { CircleCheckBig , CircleAlert , TriangleAlert  } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import CircularProgress from '@mui/joy/CircularProgress';


const vrs2 = cva('min-w-[300px] rounded-lg' , {
    variants : {
        mode : {
            dark : 'bg-[#333741] border-[#696f7b]',
            light : 'bg-[#fefefe] border-[#4165ed] hover:border-[2px]'
        } ,
        text : {
            dark : '!text-gray-200',
            light : 'text-gray-600'
        } ,
        header : {
            dark : 'text-accent' ,
            light : 'text-black'
        }
    }
})


const Sideicon = (props) => {
    const { 
        type='success' ,
        icons=true
    } = props;
    
    return(
        <div className="flex items-center justify-center mx-[10px]">
            <div className=''>
                
                {
                    type == 'success' && icons ? <div className="bg-[#85dab74e] p-1 rounded-full"><CircleCheckBig className="text-[#85dab6]" /></div> : null
                }
                {
                    type == 'error' && icons ? <div className="bg-[#f443362e] p-1 rounded-full"><CircleAlert className="text-[#f44336]" /></div>: null
                }
                {
                    type == 'info' && icons ? <div className="bg-[#2195f353] p-1 rounded-full"><CircleAlert className="text-[#2196f3]" /></div>: null
                }
                {
                    type == 'progress' && icons ? <div className="bg-[#2195f30b] p-1 rounded-full flex justify-items-center"><CircularProgress size="sm" /></div>: null
                }
                {
                    type == 'warning' && icons ? <div className="bg-[#fca21138] p-1 rounded-full"><TriangleAlert className="text-[#FCA311]" /></div>: null
                }
            </div>
        </div>
    )
}


const ToasterBody = (props) => {
    const { item } = props;
    const {
        buttons=[],
        mode='dark'
    } = props;

    const handleDismiss= () => {
        item.dismiss()
    }

    return(
        <div className="min-w-[200px] h-auto">
            <div className={cn(vrs2({ header : mode }), 
            "font-geist capitalize"
            )}
            >
                { props.header }
                <div onClick={handleDismiss} className="absolute right-[10px] z-[3000] select-none text-blue-500 font-Roboto text-[10px] top-[5px] hover:underline hover:font-bold">
                    DISMISS
                </div>
            </div>

            <div className={cn(vrs2({ text : mode }), 
                "font-Roboto text-[12px] capitalize" 
            )}
            >
                { props.body }
            </div>
            
            <div className="flex my-1 space-x-1">
                {
                    buttons.map( button => {
                        return button(item)
                    })
                }
            </div>
        </div>
    )
}


export const Mainframe = forwardRef( (props, ref ) => {
    const { item , mode='dark' } = props

    return(
        <div className={cn(vrs2({mode}))}>
            <div className="relative flex p-2">
                <ToasterSideColor {...props}  />
                <Sideicon {...props} />
                <ToasterBody {...props} item={item} />
            </div>
        </div>
    )
})