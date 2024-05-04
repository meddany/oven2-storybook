// @ts-nocheck
import $ from 'jquery'

export const getMousePosition = (event) => {
    if ( ! event ){ return { X:  0 ,  Y : 0 } } 
    if ( ! event.clientX ){ return { X:  0 ,  Y : 0 } } 
    var X = event.clientX;
    var Y = event.clientY;
    return { X , Y}
}

export const getLocations = ( event , ref , options ) => {
    if (! options ){ options = { extraPadding : 5  } }
    // Use native DOM methods where possible
    var { X , Y } = getMousePosition(event)
    var $ref = $(ref.current);
    var $enhCmBox = $ref.find('.enh-cm-box');
    if ( ! $enhCmBox[0] ) {return { X: 0, Y: 0 }; }
    var MenuBoxWidth = $enhCmBox[0].clientWidth;
    var MenuBoxHeight = $enhCmBox[0].clientHeight;
    var pageSizeW = document.body.clientWidth;
    var pageSizeH = document.body.clientHeight;
    // Minimize reflows
    if (X + MenuBoxWidth >= pageSizeW) { X = pageSizeW - MenuBoxWidth - options.extraPadding ; }
    if (Y + MenuBoxHeight >= pageSizeH) { Y = pageSizeH - MenuBoxHeight - options.extraPadding  }
    return { X: X, Y: Y };
}

export const getExactElementLocation = (event , element , options )=>{
    return getMousePosition(event)
}