// @ts-nocheck
import { forwardRef , useContext } from "react";
import TableGlobalContext from "../context/TableGlobalContext";

export const ColorInputBox = forwardRef( () => {
    const { updateOption , options } = useContext(TableGlobalContext)
    return (
        <div className="flex w-auto space-x-1">
          <label>Row Color</label>
          <input 
            type="color" 
              onChange={(e) => {
                updateOption('rowColor' , e.target.value  )
            }}
            defaultValue={options.rowColor}
          />
        </div>
      )
}) 