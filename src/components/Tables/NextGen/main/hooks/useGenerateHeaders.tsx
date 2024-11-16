// @ts-nocheck
import { useEffect, useState ,useCallback, useContext, useRef, useMemo   } from "react"
import { Checkbox } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CheckIcon,X , Square, SquareCheck} from "lucide-react";
import { CustomCheckboxFilter } from "./useCheckboxFilter";

export const CustomRender = (props) => {
    const [ checked , setChecked ] = useState(false)

    useEffect(() => {
        const selectionChangedHandler = () => {
            setChecked(props.node.isSelected());
        };
        props.api.addEventListener('rowSelected', selectionChangedHandler);
        return () => {
            props.api.removeEventListener('rowSelected', selectionChangedHandler);
        };
    }, [props.api, props.node]);

    
    return (
        <div className="w-full h-full flex justify-start items-center">
            <Checkbox 
                icon={<Square className='text-gray-200' />} 
                checkedIcon={<SquareCheck className='text-white' />} 
                checked={checked} size="small"
            />
        </div>
    )
}

export const CustomLabelCellContent = ( props , formater ) => {
    const { value } = props;
    if ( formater ){
        return formater(props)
    }
    if ( value?.toString() === 'true'  ){
        return(
            <div title={value?.toString()}>
                <CheckIcon className="text-green-500" />
            </div>
        )
    }
    if ( value?.toString() === 'false' ){
        return(
            <div title={value?.toString()}>
                <X className="text-red-500" />
            </div>
        )
    }
    return (
        <div  title={value?.toString()} className="flex items-center w-full relative h-full">
            <label>{value}</label>
        </div>
    )
}

export const CustomLabelCell = ( props , formater ) => {
    return (
        <div className="flex items-center w-full relative h-full">
            {
                CustomLabelCellContent(props,formater)
            }
        </div>
    )
}




export const useHeaders = (data,mapper,hidden=[],hideFromTable=[],formater={},filterItems , setFilterItems,filter,groupBy=false) => {
    const [ headers , setHeaders ] = useState([])
    const hideFromTable2 = ['view' , ...hideFromTable]
    
    function getFilteredData(key ){
        const f = data.map( item => {
            setFilterItems(prev => getUniqueArray([...prev , {key : key , item : item[key] , view : true }]) )
            return item[key]
        } )
        return [...new Set(f)];
    }

    const getUniqueArray = (arr) => {
        const seenIds = new Set();
        return arr.filter(item => {
            if (seenIds.has(item.item)) {
                return false;
            } else {
                seenIds.add(item.item);
                return true;
            }
        });
    };

    function getFilterType(column){
        for ( const key in filter ){
            const item = filter[key];
            if ( item.column == column &&  item?.filter == 'checkbox'){
                return CustomCheckboxFilter
            }
        }
        return true
    }

    const getChecboxRowSelection = useMemo( () => {
        return {
            cellRenderer: CustomRender ,
            minWidth : 50 ,
            width : 50 ,
            maxWidth : 50 ,
            sortable: false , 
            suppressHeaderMenuButton: true , 
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true , 
            pinned : false ,
            flex: true,
        } 
    } , [])

    const agGroupCellRenderer = useMemo( () =>{
        return {
            minWidth : 50 ,
            width : 50 ,
            maxWidth : 50 ,
            flex :true,
            cellRenderer: 'agGroupCellRenderer',
        }
    } , [])

    function renderNonGroupingHeaders(){
        if ( data.length > 0 && filterItems ){
            const data2 = data
            data2.map( item => item.view = true)
            const heads = Object.keys(data[0])
            const fn = [ getChecboxRowSelection]
            heads.map( (item) => fn.push(
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
                    filter: getFilterType(item) , 
                    floatingFilter: false ,
                    minWidth : 250 ,
                    flex:1,
                    hide: hidden.includes( item ) ? true : hideFromTable2.includes(item) ? true : false ,
                    cellRenderer : (params) => { return CustomLabelCell(params , formater[item])}  ,
                    resizable:true ,
                }) )
            setHeaders( prev => fn )
        }
    }

    useEffect( () => {
        renderNonGroupingHeaders()
    } , [data])

    return [ headers , setHeaders ]

}