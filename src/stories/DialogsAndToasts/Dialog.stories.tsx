// @ts-nocheck
import PropTypes from 'prop-types'
import { useArgs } from '@storybook/store'
import { AppFrame , Button , Dialog  } from '../../components/oven2'
import { ModelPaperStory } from './ModelContent/ModelPaperStory'

export default {
  title: 'DialogsAndModels/MainModel',
  component: AppFrame,
}

const Template = (args) =>  <ModelPaperStory />

export const MainModel = Template.bind({})

MainModel.args = {
    bodyContent : <ModelPaperStory /> ,
}