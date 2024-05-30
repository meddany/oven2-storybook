import React , {useEffect, useState} from 'react'
import $ from 'jquery'

export default function useBoxSize(ref) {
  const [ size , setSize ] = useState({y: 0 , x: 0})

  useEffect( () => {
    if ( ref.current ){
      const y = $(ref.current).height()
      const x = $(ref.current).width()
      setSize({y, x})
    }
  } , [ref])

  return [size , setSize]
}
