// @ts-nocheck
import PropTypes from 'prop-types'
import { AppFrame , Headline } from '../../components/oven2'
import './styles.css'
import LongText from './LongText'

export default {
  title: 'components/Frames',
  component: AppFrame,
  tags: ['autodocs'] ,
  args : {
    topbar : true ,
    bgcolor : 'var(--oven-light-gray)' ,
    topbarColor : 'yellow' ,
    footerColor : 'yellow' ,
    width : '100vw' ,
    height : '30vh' ,
    body : true ,
    footer : true , 
    frameClasses: [],
    bodyClasses: [],
    enableCustomScrollbar : true , 
    topbarClasses: [],
    topbarContent : "top bar content" ,
    bodyContent : "body content" ,
    footerContent : "footer bar content" ,
  }
}

const Template = (args) => <AppFrame {...args} />

/**
Complete app frame for my application, is has top , body and footer content
*/
export const CompleteAppFrame = Template.bind({})


export const BodyOnly = Template.bind({})
BodyOnly.args={
  body : true,
  footer : false , 
  topbar : false
}


export const TopBarAndBody = Template.bind({})
TopBarAndBody.args={
  body : true,
  footer : false , 
  topbar : true
}
