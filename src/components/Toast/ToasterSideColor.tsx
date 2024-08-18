// @ts-nocheck
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const vrs = cva( 'h-full w-[3px] rounded-lg' , {
    variants : {
        type : {
            success : 'bg-[#4caf50]',
            error : 'bg-[#f44336]',
            info : 'bg-[#2196f3]',
            progress : 'bg-[#2196f3]',
            warning : 'bg-[#FCA311]',
            dark : 'bg-[#37474f]'
        }
    }
})

export const ToasterSideColor = (props) => {

    const { 
        type='success'
    } = props;


    return (
        <div className='relative'>
            <div className={cn(vrs({type}))}></div>
        </div>
    )
}