// @ts-nocheck
import $ from 'jquery';
import hotkeys from 'hotkeys-js';

var registeredEvents = []
var keysCombinations = []
export function convertToPlusKeys(extra , key){
    const trueKeys = Object.keys(extra).filter(key => extra[key] === true)
    const keys1 =  trueKeys.join('+')
    const keys2 = key
    return (keys1 + "+"+keys2).toLowerCase()
}
export function disableHotkey(updatedItem){
    const index = updatedItem.index
    registeredEvents[index]=updatedItem
}


export function hotkeyRegister(hotkey ,action,  label) {
    const keys = hotkey
    if ( ! keysCombinations.includes(keys) ){
        keysCombinations.push(keys)
    }
    else{
        console.warn('hotkeys already registered. maybe be it will overlap => ' , keys )
    }
    const index = registeredEvents.length
    const item = {
        keys : keys,
        hotkey : hotkey,
        action : action ,
        label : label ,
        enable: true,
        index : index
    }
    hotkeys(keys,(event,hotkeyEvent) => {
        const litem = registeredEvents[index]
        if( litem.enable == false ){
            console.warn('event supressed! action will not be triggered')
            return
        }
        event.preventDefault()
        action(event, hotkeyEvent )
    } )
    registeredEvents.push(item)
    return item
}

export function clearHotkeyRegister({ keys } ) {
    hotkeys.unbind(keys);
}

export function clearAllHotkeyRegister(){
    registeredEvents.forEach( item => {
        clearHotkeyRegister(item)
    })
    registeredEvents.length = 0
}

export function getAllKeyCodes(){
    return {native : hotkeys.getAllKeyCodes(), 'data' :  registeredEvents }
}