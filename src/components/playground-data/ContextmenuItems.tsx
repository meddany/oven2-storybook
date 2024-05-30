import { Trash2 , Activity , MoveLeft , ArrowRightFromLine , ListRestart ,BoxSelect , Send   } from 'lucide-react';


export const data = [
    { label : 'Back' , action : () => {} , seperator : false , size : 'sm' ,type: 'default' , shortcut : '⌘Y' , pinned : true , icon: <MoveLeft strokeWidth={1.5} absoluteStrokeWidth />  } ,
    { label : 'Submit' , action : () => {} , seperator : false , size : 'sm' ,type: 'default' , shortcut : '⌘S' , pinned : true , icon: <Send strokeWidth={1.5} absoluteStrokeWidth />  } ,
    { label : 'Forward' , action : () => {} , seperator : false  , size : 'sm' , type: 'default' ,icon:<ArrowRightFromLine /> , subItems: 
    [
        { label : 'More' , action : () => {} , seperator : false , size : 'sm' ,type: 'default' , shortcut : '⌘M' , subItems: [
            { label : 'Back' , action : () => {} , seperator : false , size : 'sm' ,type: 'default' , shortcut : '⌘Y' } ,
            { label : 'Forward' , action : () => {} , seperator : false  , size : 'sm' , type: 'default' } ,

        ] } ,
    ]
    } ,
    { label : 'Reload' , action : () => {} , seperator : false  , size : 'sm' , disabled:true , type: 'default' , shortcut : '⌘s' , pinned : true , icon: <Activity strokeWidth={1.5} absoluteStrokeWidth />  } ,
    { label : 'More tools', pinned : true ,icon:<BoxSelect /> , action : () => {} , seperator : true  , size : 'sm' , type: 'default' , shortcut : '⌘[' , subItems : [
        { label : 'Back' , action : () => {} , seperator : false , size : 'sm' ,type: 'default' , shortcut : '⌘Y' } ,
        { label : 'toggle option' , action : () => {} , danger : false , seperator : false  , size : 'sm' , type: 'checkbox', defaultChecked: false  } ,
    
    ] } ,
    { label : 'Reset' , icon:<ListRestart /> , pinned:'both' ,action : () => {} , seperator : true  , size : 'sm' , type: 'default' , subItems: [] , disabled : true  } ,
    { label : 'Delete' , action : () => {} , danger : true , seperator : false  , size : 'sm' , type: 'default', disabled : false ,icon: <Trash2 strokeWidth={1.5} absoluteStrokeWidth />  } ,
    { label : 'toggle option' , action : () => {} , danger : false , seperator : false  , size : 'sm' , type: 'checkbox', defaultChecked: true  } ,
    { label : 'switch option' , action : () => {} , danger : false , seperator : false  , size : 'sm' , type: 'switch', defaultChecked: true , disabled : false  } ,
    { label : 'Open Down' , action : () => {} , danger : false , seperator : false  , size : 'sm' , type: 'accordion', defaultOpen: true , disabled : false  , content : 'Thanks for opening the accordiong' } ,
    { label : 'toggle group' , action : () => {} , danger : false , seperator : false  , size : 'sm' , type: 'radiogroup' , disabled : false , 
    onChange:(e,v,s)=>{
        console.log(e,v,s)
    },
    group : [
        { label : 'option1' , value: 1 } ,
        { label : 'option2' , value: 2 , defaultChecked : true  } ,
        { label : 'option3' , value: 3 } ,
    ]  } ,
]