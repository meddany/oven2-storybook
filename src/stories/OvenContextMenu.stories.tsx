// @ts-nocheck
import PropTypes from 'prop-types'
import $ from 'jquery'
import { useArgs } from '@storybook/store';
import CustomIconButton from '../components/oven2/CustomIconButton/CustomIconButton';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import EnhancedContextMenu from '../components/oven2/EnhancedContextMenu/EnhancedContextMenu';

export default {
  title: 'Context Menu',
  component: EnhancedContextMenu,
  propTypes : {
    event : PropTypes.object
  }
}

const Template = args => {
    const [ _ , updateArgs ] = useArgs();

    function handleContextMenu(event){
        updateArgs({ event : event })
    }
    return (
        <div onContextMenu={handleContextMenu} className='_testing-div' style={{width: '800px' , height: '400px' , position : 'relative' , background : '#9da7be' , display: 'flex' , alignItems : 'center' , justifyContent : 'center' , borderRadius : 20}}>
            RIGHT CLICK ANYWHERE TO CONTENT MENU
            <EnhancedContextMenu {...args} />
        </div>
    )
}

export const EnhancedContextmenuTemplate = Template.bind({})
EnhancedContextmenuTemplate.args = {
    menuItems : [
        { 
        label : 'select option' ,
        action : function(value){ console.log(value , ' selected ') } , 
        custom : true ,
        type : 'select' ,
        options : ['1' , '2' , 3 ] ,
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
        } ,
        { 
        label : 'Open Context2' ,
        action : function(){ console.log('menu triggered.') } ,
        pinned : 'both' , 
        child: <FileOpenIcon sx={{color : '#029cfd'}} />
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
    sideIcons : false ,
    sideIconsSideBorder : false , 
    sideIconsSideBackground : false ,
    enableAnimations : true , 
    animationMotion : 'slide'

}

