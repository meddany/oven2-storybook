// @ts-nocheck
import $ from 'jquery'

export const getMousePosition = (event) => {
    var X = event.clientX;
    var Y = event.clientY;
    return { X , Y}
}

export const getLocations = (event , ref , options ) => {
    // Use native DOM methods where possible
    var { X , Y } = getMousePosition(event)
    var $ref = $(ref.current);
    var $enhCmBox = $ref.find('.enh-cm-box');
    var MenuBoxWidth = $enhCmBox[0].clientWidth;
    var MenuBoxHeight = $enhCmBox[0].clientHeight;
    var pageSizeW = document.body.clientWidth;
    var pageSizeH = document.body.clientHeight;
    // Minimize reflows
    if (X + MenuBoxWidth >= pageSizeW) { X = pageSizeW - MenuBoxWidth - options.extraPadding ; }
    if (Y + MenuBoxHeight >= pageSizeH) { Y = pageSizeH - MenuBoxHeight - options.extraPadding  }
    return { X: X, Y: Y };
}