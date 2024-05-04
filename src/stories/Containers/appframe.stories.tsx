// @ts-nocheck
import PropTypes from 'prop-types'
import { AppFrame , Headline } from '../../components/oven2'
import './styles.css'
import LongText from './LongText'

export default {
  title: 'AppFrame',
  component: AppFrame,
}

const Template = (args) => <AppFrame {...args} />

export const MainAppFrame = Template.bind({})

MainAppFrame.args = {
    topbar : true ,
    bgcolor : 'var(--oven-light-gray)' ,
    width : '100vw' ,
    height : '100vh' ,
    body : true ,
    footer : true , 
    frameClasses: ['test-bdy'],
    bodyClasses: [],
    enableCustomScrollbar : true , 
    topbarClasses: [],
    topbarContent : <Headline color='#fff' >top bar content here </Headline> ,
    bodyContent : <LongText /> ,
    footerContent : <Headline color='#fff' >footer bar content here </Headline> ,
    
}