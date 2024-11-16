// @ts-nocheck
import { useRef , forwardRef , useState, useEffect  } from 'react';
import { getWholeSpectrum } from '../utils/optics'
import { AutoComplete } from '..';

const options = getWholeSpectrum()

export const Frequency = forwardRef((props,ref) =>{

  const { onChange } = props;  
  const ref1 = ref || useRef({})
  const [ description , setDescription ] = useState({
    state : null , 
    message : null
  })

  const handleOnChange = (ref,value) => {
    if ( ! options.includes(value)){
        setDescription({
          state : 'invalid' ,
          message : "Frequency is invalid"
        })
        return
    }
    
    setDescription({
      state : 'valid' ,
      message : "Frequency is valid"
    })

    if (onChange){
      onChange(ref,value)
    }
  }

  return (
      <AutoComplete 
        {...props}
        options={options}
        title='Frequency'
        placeholder='Select Frequency - 6.25 Granuality'
        type='number'
        className={'w-full'}
        onChange={handleOnChange}
        tmpdescription={description}
        ref={ref1}
      />
  );
})