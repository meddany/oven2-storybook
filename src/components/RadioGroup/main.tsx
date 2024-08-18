// @ts-nocheck
import { forwardRef, useEffect, useRef ,useState ,createContext, useContext  } from "react";
import { useRandomId } from "../utils/utils";
import './style.css'
import $ from 'jquery'
import {  SubHeader } from "../Paragraph/Headlines/Headline/MainHeader";
import { ReactNode, MouseEvent, ChangeEvent, Context } from 'react';
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";



interface RadioItemProps {
    children?: ReactNode;
    header?: ReactNode;
    onSelect?: (ev: ChangeEvent<HTMLInputElement>, checked: boolean, state: any) => void;
    onClick?: (state: any) => void;
    onDoubleClick?: (state: any) => void;
    onContextMenu?: (state: any) => void;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  }
  
  // Define the context type for RadioGroupContext
  interface RadioGroupContextProps {
    name: string;
    onChange: (state: any) => void;
  }

const RadioGroupContext: Context<RadioGroupContextProps> = createContext({ name: '', onChange: () => {} });


export const RadioItem: React.FC<RadioItemProps> = (props) => {
  const radioRef = useRef<HTMLInputElement>(null);
  const id = useRandomId(); // Assume this is a custom hook or function you have
  const ref = useRef<HTMLLabelElement>(null);
  const { name, onChange } = useContext<RadioGroupContextProps>(RadioGroupContext);

  const {
    children,
    header,
    onSelect = () => {},
    onClick = () => {},
    onDoubleClick = () => {},
    onContextMenu,
    labelProps = {},
    className={},
    inputProps = {}
  } = props;

  const checkChecked = (ev: ChangeEvent<HTMLInputElement>) => {
    const s = {
      ref,
      id,
      radioRef,
      checked: ev.target.checked,
      event: ev,
      props,
      children,
      source: 'change'
    };
    onChange(s);
    onSelect(ev, ev.target.checked, s);
  };

  const handleOnClick = (ev: MouseEvent<HTMLLabelElement>) => {
    const s = {
      ref,
      id,
      radioRef,
      checked: radioRef.current?.checked,
      event: ev,
      props,
      children,
      source: 'click'
    };
    onClick(s);
  };

  const handleDoubleClick = (ev: MouseEvent<HTMLLabelElement>) => {
    const s = {
      ref,
      id,
      radioRef,
      checked: radioRef.current?.checked,
      event: ev,
      props,
      children,
      source: 'dbclick'
    };
    onDoubleClick(s);
  };

  const handleContextMenu = (ev: MouseEvent<HTMLLabelElement>) => {
    const s = {
      ref,
      id,
      radioRef,
      checked: radioRef.current?.checked,
      event: ev,
      props,
      children,
      source: 'contextmenu'
    };
    $(ref.current).click()
    ev.preventDefault();
    onContextMenu(s);
  };

  return (
    <label
      onContextMenu={onContextMenu ? handleContextMenu : null }
      onDoubleClick={handleDoubleClick}
      onClick={handleOnClick}
      {...labelProps} 
      htmlFor={id}
      ref={ref}
      className={cn("relative p-2 border-[2px] border-gray-300 rounded-sm min-w-[200px] min-h-[100px] bg-white", className )}
    >
      <div className="flex items-center space-x-1">
        <input
          {...inputProps}
          ref={radioRef}
          onChange={checkChecked}
          id={id}
          type="radio"
          className="w-[20px] h-[20px]"
          name={name}
        />
        <SubHeader>{header}</SubHeader>
      </div>
      {children}
    </label>
  );
};

const vrs = cva("relative flex space-x-1" , {})

export const RadioGroup = forwardRef( (props,ref) => {


    const {
        children,
        onChange=()=>{},
        onContextMenu,
        className,
        style
    } = props

    const groupName = useRandomId()
    const [ currentSelected , setCurrentSelected ] = useState()

    useEffect( () => {
        if ( currentSelected && currentSelected.ref.current ){
            // console.log('selection' , currentSelected )
            $('#'+groupName+' *').removeClass('css-c-233')
            currentSelected.ref.current.classList.add('css-c-233')
            onChange(currentSelected.event , currentSelected.checked  ,currentSelected)
        }
    } , [currentSelected])

    const handleOnContextMenu = (ev) => {
        ev.preventDefault();
        onContextMenu(currentSelected.event , currentSelected.checked  ,currentSelected)
    }

    return(
        <RadioGroupContext.Provider value={{name: groupName , onChange : setCurrentSelected }}>
            <div style={style||{}} onContextMenu={onContextMenu ? handleOnContextMenu : null } id={groupName} className={cn(vrs() , className)} name={name||groupName}>
                {children}
            </div>
        </RadioGroupContext.Provider>

    )

})