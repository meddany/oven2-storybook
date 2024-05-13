// @ts-nocheck

import React , { useRef , useState , useEffect , createContext , useContext, forwardRef  } from 'react'
import '../style.css'
import { Stack } from '@mui/material';
import { Headline } from '../../../../Paragraph/Headlines';
import { Button } from '../../../../Buttons';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import '../../../../OvenScrollbar/OvenScrollbar.css'
import CheckPng from '../../src/check2.png'
import { DialogsContext } from '../SimpleAlerts';
import { Dialog } from '../../../Model';
import { GeneralDialogBox } from './DialogBox';


export const ConfirmBox = forwardRef( (props , _ ) => {
    const { footerItem , callback , header , body , accept , decline , onAccept , onCancel , danger ,id } = props;
    return <GeneralDialogBox {...props} type='confirm' />
})
