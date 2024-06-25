// @ts-nocheck
import { useRef , forwardRef } from 'react';
import { getWholeSpectrum } from '../utils/optics'
import { AutoComplete } from '..';

const options = getWholeSpectrum()

export const Frequency = forwardRef((props,ref) =>{

  const { onInputChange } = props;  
  const ref1= useRef({})
  const handleOnChange = (ref,value) => {
    if ( ! options.includes(value)){
      ref1.current.api.updateDescription( 'invalid' , "Frequency is invalid.")
      return
  }
  ref1.current.api.updateDescription('valid' , 'Frequency is valid.')
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
        onInputChange={handleOnChange}
        ref={ref}
      />
  );
})