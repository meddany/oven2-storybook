// @ts-nocheck

import  { forwardRef, useEffect  ,useState   } from 'react';
import OvenPrimeNotify from './Toast/Prime/Prime';
import FluentComponent from './Toast/Fluent/FluentComponent';
import { FluentProvider, teamsLightTheme , teamsDarkTheme } from '@fluentui/react-components';
import { store } from './store/store';
import ModalOven from './dialogs/main';
import LoadingWhitePaper from './loadingscreens/LoadingWhitePaper/LoadingWhitePaper';
import FluentNotifyWithActions from './Toast/Fluent/FluentNotifyWithActions';
import MainAlertsAndConfirmsDialog from './AlertsAndConfirms/mainDialog';
import { useOvenify } from './OvenGlobalState'
import NativeAnyflex from './NativeAnyflex/NativeAnyflex';

const OvenifyWrapper2 = forwardRef(( props , _ ) => {
  
  const [ fluentTheme , setFluentTheme ] = useState( teamsLightTheme )
  const ovenify = useOvenify()
  
  function changeFluentTheme(theme,themeMode){
    if ( theme == 'light'){
      setFluentTheme( prev =>  teamsLightTheme )
    }

    else if ( theme == 'dark'){
      setFluentTheme( prev =>  teamsDarkTheme )
    }

    else if ( theme == 'custom'){
      setFluentTheme( prev =>  themeMode )
    }

  }

  function manageDefaults(){

    if (ovenify.notify  == undefined){ 
      ovenify.notify = {}
      ovenify.dialog = {}
      ovenify.store = store
      ovenify.loading = {}
      ovenify.options = store
      ovenify.alerts = {}
      ovenify.global = store.global
    }
    ovenify.ipc = undefined
    ovenify.changeFluentTheme = changeFluentTheme
    ovenify.ready = true
  }

  useEffect(() => {
    console.log('ovenify has changed ', ovenify);

    if ( ovenify == undefined){
      throw Error(`Ovenify Requires to pass ovenify dict using global context method. 
      example :-

      const ovenify = useRef({})

      in main app.tsx

      <OvenifyContext.Provider value={{ ovenify }}>
        {children}
      </OvenifyContext.Provider>

      `)
    }

    manageDefaults()

  }, [ovenify]);

  return (
    <div ref={ovenify}>
      <OvenPrimeNotify />
      <FluentProvider theme={fluentTheme}>
        <FluentComponent />
        <FluentNotifyWithActions />
      </FluentProvider>
      <ModalOven />
      <LoadingWhitePaper />
      <MainAlertsAndConfirmsDialog />
      <NativeAnyflex />
    </div>
  );
});

export default OvenifyWrapper2;