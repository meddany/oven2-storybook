import {useEffect, useState} from 'react'
import $ from 'jquery'

export default function useBoxSize(ref) {
  const [ size , setSize ] = useState({y: 0 , x: 0})

  const update = () => {
    const y = $(ref.current).height()
    const x = $(ref.current).width()
    setSize({y, x})
  }

  useEffect( () => {
    if ( ref.current ){
      const resizeObserver = new ResizeObserver(() => {
        update()
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect(); // clean up 
    }
  } , [ref])

  return [size , setSize]
}
