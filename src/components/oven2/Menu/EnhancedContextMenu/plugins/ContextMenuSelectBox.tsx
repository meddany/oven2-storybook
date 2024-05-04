// @ts-nocheck
import React , { useEffect , useContext , useState , useRef , forwardRef   } from "react";
import MuiSelectBox from "../../../Select/MuiSelectBox/MuiSelectBox";
import { MarginBox } from "../../../Containers";
import EnhancedMenuContext from "./Context";
export function ContextMenuSelectBox(props){
    const { item }  = props;
    const { options } = useContext(EnhancedMenuContext)
    return (
        <>
            <div className='prevent---hide' style={{width : '100%' , pointerEvents: 'all' , background : 'white' , height : '30px'}} >
                <MuiSelectBox 
                    options={item.options}
                    size='small'
                    multiple={false}
                    label={item.label}
                    defaultValue={item.defaultValue}
                    maxHeight={options.menuHeight} 
                    onChange={(e,value) => {
                        if ( item.onChange ){
                            item.onChange( value );
                        }
                    }}
                />
            </div>
        </>

    )
}
