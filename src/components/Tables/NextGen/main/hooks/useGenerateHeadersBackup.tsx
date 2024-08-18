// @ts-nocheck
import { useEffect, useState ,useCallback, useContext, useRef   } from "react"
import { Checkbox } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CheckIcon,X  } from "lucide-react";
import { Label } from "@/components"
import { useGridFilter } from "ag-grid-react";
import { TableContext } from "../main";
import $ from 'jquery'
import useSecondEffect from "@/components/Api/useSecondEffect"; 

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
        <div className="w-full h-full flex justify-start items-center">
            <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon sx={{color : 'white'}} />} checked={checked} size="small" />
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
        <div className="flex items-center w-full relative h-full">
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

export function getColumnFilterAllSelected(filterItems,field){
    return filterItems.filter( element => element.view == false && element.key == field) == 0
}

const CustomCheckboxFilter = (props) => {
    const {
        api ,
        colDef,
        getValue,
        model,
    } = props;

    console.log(props)
    const field = colDef.field;
    const filteredDataArray = props.colDef.data
    const { filterItems , setFilterItems } = useContext(TableContext)
    const ref = useRef()

    const handleFilterChange = (event,item) => {
        const checked = event.target.checked
        console.log(item)
        setFilterItems( prev => {
            const fn = []
            prev.map( elem => {
                if ( elem.key == field && elem.item == item ){
                    elem.view = checked
                }
                fn.push(elem)
            })
            return fn
        })
    }

    const selectAll= (chcked) => {
        ref.current.querySelectorAll('input').forEach( element => {
            element.checked = chcked
        })
        setFilterItems( prev => {
            const fn = []
            prev.map( elem => {
                if ( elem.key == field ){
                    elem.view = chcked
                }
                fn.push(elem)
            })
            return fn
        })
    }


    useEffect( () => {
        console.log('filter array is coloumn=', field , " >> " , filterItems)
        const fnItems = filterItems.filter( element => element.view == true)
        const isSelectAll = getColumnFilterAllSelected(filterItems,field)
        const nfilter2 = [...new Set(fnItems.map( item => item.item ))]
        columnApi.setColumnFilterModel( field, {
            values: nfilter2
        })
        .then(() => {
            api.onFilterChanged();
        })
        if ( isSelectAll ){
            api.setFilterModel({[field] : null  })
        }
    } , [filterItems])

    const getColumnData = (node) => {
        const { data } = node
        console.log(data)
        for ( let key in data ){
            const header = key
            const value = data[key]
            for ( let key2 in filterItems) {
                const item = filterItems[key2]
                if ( item.key == header && item.item == value ){
                    data.extend=item
                    break
                }
            }
        }
        return data
    } 

    const doesFilterPass = (params) => {
        const { node } = params
        const value = getValue(node)
        getColumnData(node)
        if ( ! model ){ return true }
        return model.values.includes(value)
    }

    useGridFilter({doesFilterPass})

    return(
        <div ref={ref} className="p-2 max-h-[50vh] min-w-[200px] overflow-auto relative">
            <div className="uppercase border-b text-black p-1">
                <Label>{field}</Label>
                <div className="flex gap-1 items-center">
                    <div>
                        <Checkbox 
                            defaultChecked={true}
                            onChange={(event) => {
                                selectAll(event.target.checked)
                            }}
                        />
                    </div>
                    <div>
                        <Label>Select All</Label>
                    </div>
                </div>
            </div>
            <div className="h-full overflow-auto">
                {
                    filteredDataArray.map( (item,index) => {
                        return(
                            <div key={index} className="flex gap-1 items-center">
                                <div>
                                    <input 
                                        className="w-[20px] h-[20px] rounded-full"
                                        type='checkbox'
                                        defaultChecked={true}
                                        onChange={(event) => {
                                            handleFilterChange(event,item)
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>{item}</Label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export const useHeaders = (data,mapper,hidden=[],hideFromTable=[],formater={},filterItems , setFilterItems,filter) => {
    const [ headers , setHeaders ] = useState([])

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
        for ( let key in filter ){
            const item = filter[key];
            if ( item.column == column &&  item?.filter == 'checkbox'){
                return CustomCheckboxFilter
            }
        }
        return true
    }

    useEffect( () => {
        if ( data.length > 0 && filterItems ){
            const heads = Object.keys(data[0])
            const fn = [
                {
                    cellRenderer: CustomRender ,
                    minWidth : 50 ,
                    width : 50 ,
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
                    filter: getFilterType(item) , 
                    floatingFilter: false ,
                    data: getFilteredData(item),
                    width : 250 ,
                    viewRow : true ,
                    hide: hidden.includes( item ) ? true : hideFromTable.includes(item) ? true : false ,
                    cellRenderer : (params) => { return CustomLabelCell(params , formater[item])}  ,
                    resizable:true ,
                }) )
            setHeaders( prev => fn )
        }
    } , [data])

    return [ headers , setHeaders ]

}