// @ts-nocheck
import PropTypes from 'prop-types'
import $ from 'jquery'
import { useArgs } from '@storybook/store';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { IconButton as CustomIconButton } from '../../components/oven2';
import { ContextMenu as EnhancedContextMenu } from '../../components/oven2';
import { hotkeyRegister , clearHotkeyRegister } from '../../components/oven2';
import { useEffect, useRef } from 'react';
import { AppFrame } from '../../components/oven2';
export default {
  title: 'Context Menu',
  component: EnhancedContextMenu,
}

const Template = args => {
    const [ _ , updateArgs ] = useArgs();
    const ref = useRef()
    function handleContextMenu(event){
        updateArgs({ event : event })
    }


    return (
        <AppFrame 
        topbar={false}
        footer={true}
        body={true}
        width={'100vw'}
        height={'100vh'}
        footerContent={<p style={{color : '#fff'}}>'Context Menu Content'</p>}
        bodyContent={
            <div ref={ref} onContextMenu={handleContextMenu} className='_testing-div' style={{width: '800px' , height: '400px' , position : 'relative' , background : '#9da7be' , display: 'flex' , alignItems : 'center' , justifyContent : 'center' , borderRadius : 20}}>
                RIGHT CLICK ANYWHERE TO CONTENT MENU
                <EnhancedContextMenu {...args} />
            </div>
            }


        />
        
    )
}

export const EnhancedContextmenuTemplate = Template.bind({})
EnhancedContextmenuTemplate.args = {
    menuItems : [
        { 
        label : 'Selectbox 1 in page with header' ,
        subItems : [
            {
                label : 'Set update intervals' ,
                custom : true ,
                type : 'select' ,
                frame : 'page' ,
                defaultValue : '1' ,
                header : 'Set update intervals' ,
                options : ['1' , '2' , '3' ] ,
                frameOptions : {
                    width : '250px' ,
                    // height : '100px'
                } ,
                onChange: (value) => {
                    console.log('select box changed')
                }
            } ,
            {
                label : 'Set update intervals2' ,
                custom : true ,
                type : 'select' ,
                frame : 'page' ,
                defaultValue : '1' ,
                header : 'Set update intervals2' ,
                options : ['1' , '2' , '3' ] ,
                frameOptions : {
                    width : '250px' ,
                    // height : '100px'
                } ,
                onChange: (value) => {
                    console.log('select box changed2')
                }
            } ,
            {
                label : 'Update input text' ,
                custom : true ,
                type : 'custom' ,
                element : <input type='text' /> ,
                frame : 'page' ,
                defaultValue : '1' ,
                header : 'Update input text' ,
                options : ['1' , '2' , '3' ] ,
                frameOptions : {
                    width : '250px' ,
                    // height : '100px'
                } ,
                onChange: (value) => {
                    console.log('select box changed2')
                }
            } ,
            {
                label : 'Update radio' ,
                custom : true ,
                type : 'radio' ,
                frame : 'page' ,
                defaultValue : '1' ,
                header : 'Update radio' ,
                options : ['1' , '2' , '3' ] ,
                frameOptions : {
                    width : '250px' ,
                    // height : '100px'
                } ,
                onChange: (event , value) => {
                    console.log('radio box changed = ' , value)
                }
            } ,

        ]
        } ,

        
        { 
        label : 'Empty' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} /> ,
        hotkeys : {
            extra : {ctrl : true , alt : false , shift : false } ,
            key : 'a'
        }
        } ,
        { 
        label : 'Open Context3' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
        } ,
        { 
        label : 'Open Context4' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
        } ,
        { 
        label : 'Open Context5' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
        } ,
        { 
        label : 'Open Contex6t' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
        } ,
        { 
        label : 'Open Context13' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
        } ,
        { 
        label : 'Remove' ,
        action : function(){ console.log('menu removed.') } ,
        danger : true ,
        },
        { 
        label : 'Disabled' ,
        action : function(){ console.log('menu removed.') } ,
        danger : false ,
        disable: true 
        },
        { 
        label : '1st sub' ,
        subItems : [
            { 
                label : '2nd sub', 
                subItems : [
                    { 
                        label : 'delete', 
                        action : function(){ console.log('first clicked')}  ,
                        danger : true ,
                    }
                ] ,
            } ,
            { 
                label : 'sub 23123', 
                hotkeys : {
                    extra : {ctrl : true , alt : false , shift : false } ,
                    key : 'a'
                },
                subItems : [
                    { 
                        label : 'delete', 
                        action : function(){ console.log('first clicked')}  ,
                        danger : true ,
                    }
                ] ,
            } ,
            { 
                label : '1231231fqw', 
                subItems : [
                    { 
                        label : 'delete', 
                        action : function(){ console.log('first clicked')}  ,
                        danger : false ,
                    }
                ] ,
            } ,
        ] ,
        } ,
        
        { 
            label : '2st sub' ,
            customBgColor : '#1b1b1b' ,
            customTextColor : '#97bffc' ,
            subItems : [
                { 
                    label : '3nd sub', 
                    subItems : [
                        { 
                            label : 'delete 2', 
                            action : function(){ console.log('first clicked')}  ,
                            danger : true ,
                        }
                    ] ,
                }
            ] ,
            } ,

    ] ,
    blurOverlay : false,
    menuHeight: 30 ,
    menuItemBorder : 5  ,
    minWidth : 160 , 
    sideIcons : false ,
    sideIconsSideBorder : false , 
    sideIconsSideBackground : false ,
    enableAnimations : false , 
    animationMotion : 'slide' ,
    customHoverColor : 'var(--oven-nice-blue)' ,
    x : false, 
    y : false ,
}
