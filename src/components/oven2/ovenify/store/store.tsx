// @ts-nocheck

var _store = {}

function getStoreItem( key ){
    return _store[key]
}

function setStoreItem( key , value ){
    _store[key] = value
}

export const store =  {
    get : getStoreItem ,
    set : setStoreItem,
    global : _store ,
    getAll : () => { return _store },
    clean : () => {
        _store = {}
    }

}
