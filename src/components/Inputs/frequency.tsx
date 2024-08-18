// @ts-nocheck
import { useRef , forwardRef , useState  } from 'react';
import { getWholeSpectrum } from '../utils/optics'
import { AutoComplete } from '..';

const options = getWholeSpectrum()

export const Frequency = forwardRef((props,ref) =>{

  const { onInputChange } = props;  
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

    if (onInputChange){
      onInputChange(ref,value)
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
        onSelectChange={handleOnChange}
        tmpDescription={description}
        ref={ref1}
      />
  );
})