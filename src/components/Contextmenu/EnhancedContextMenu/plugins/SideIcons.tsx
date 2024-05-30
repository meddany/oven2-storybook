// @ts-nocheck
export function getIconSideStyle(options){
    console.log(options)
    if (! options.sideIcons){ return {}}
    return {
        width : '1.5px' ,
        // background: '#a0aadd',
        height : options.menuHeight ,
    }
}

export function getClassesForSideBar(options){
    const classes = []
    if ( options.sideBar){classes.push('enh-cm-side-icon-container')}
    if ( options.sideIconsSideBorder){ classes.push('with-border')  }
    if ( options.sideIconsSideBackground){ classes.push('with-bkg')  }
    return classes.join(' ')
}