
import { createGlobalState } from 'react-hooks-global-state'
const { setGlobalState , useGlobalState } = createGlobalState({'ovenify' : {} })

function useOvenify(){
    const [o] = useGlobalState('ovenify')
    return o
}

export { setGlobalState, useGlobalState , useOvenify }
