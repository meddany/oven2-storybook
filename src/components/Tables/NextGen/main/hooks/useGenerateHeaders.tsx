// @ts-nocheck
import { useEffect, useState , useContext } from "react"
import { Checkbox } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CheckIcon,X  } from "lucide-react";

export const CustomRender = (props) => {
    const [ checked , setChecked ] = useState(false)

    useEffect(() => {
        const selectionChangedHandler = () => {
            setChecked(props.node.isSelected());
        };
        // Add event listener for row selection changes
        props.api.addEventListener('rowSelected', selectionChangedHandler);
        // Clean up event listener on component unmount
        return () => {
            props.api.removeEventListener('rowSelected', selectionChangedHandler);
        };
    }, [props.api, props.node]);

    
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon sx={{color : 'white'}} />} checked={checked} size="small" />
        </div>
    )
}

export const CustomLabelCell = ( props ) => {
    const { value } = props;
    if ( value?.toString() === 'true'  ){
        return(
            <div>
                <CheckIcon className="text-green-500" />
            </div>
        )
    }
    if ( value?.toString() === 'false' ){
        return(
            <div>
                <X className="text-red-500" />
            </div>
        )
    }
    
    return (
        <div className="flex items-center">
            <label>{value}</label>
        </div>
    )


}

const getHeadersWidths = (headers, data)=>{
    const fn = {}
    headers.map( header => {
        fn[header] = header.toString().length * 12
    })
    headers.map( header => {
        const rows = data.map( item => item[header])
        rows.map( row => {
            const length = row?.toString().length > 100 ? row?.toString().length : (row?.toString().length * 12 )
            if ( fn[header] < length){
                fn[header]= length
            }
        })
    })
    return fn
}

export const useHeaders = (data,mapper,hidden=[]) => {
    const [ headers , setHeaders ] = useState([])
    useEffect( () => {
        if ( data.length > 0 ){
            const heads = Object.keys(data[0])
            const widths = getHeadersWidths(heads , data)
            const fn = [
                {
                    cellRenderer: CustomRender ,
                    width : 80 ,
                    maxWidth : 50 , 
                    sortable: false , 
                    suppressHeaderMenuButton: true , 
                    headerCheckboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true , 
                    pinned : false ,
                    flex: true
                }
            ]

            heads.map( item => fn.push(
                {
                    field : item ,
                    headerName : function(){
                        let label = item
                        mapper.map( map => {
                            if ( map.key == item ){
                                label = map.value
                                return label
                            }

                        })
                        return label.charAt(0).toUpperCase() + label.slice(1);
                    }() ,
                    filter: true, 
                    floatingFilter: false ,
                    width : widths[item] ,
                    hide: hidden.includes( item ) ? true : false ,
                    cellRenderer : CustomLabelCell  ,
                    resizable:true ,

                }) )
            setHeaders( prev => fn )
        }
    } , [data])

    return [ headers , setHeaders ]

}