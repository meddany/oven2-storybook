// @ts-nocheck
import * as React from "react";
import {
  useId,
  Button,
  Link,
  SpinButton,
  Field,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastTrigger,
} from "@fluentui/react-components";

import { useOvenify } from "../../OvenGlobalState";

const  FluentComponent = (props) => {
    const _ref = React.useRef()
    const [timeout, setDismissTimeout] = React.useState(5000);
    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);
    // const { ovenify } = React.useContext(OvenifyContext)
    const ovenify = useOvenify()

    React.useEffect( () => {
      if ( ovenify.ready ){
        ovenify.notify.fluent = {
          ref: _ref,
          success: ( ({body , params}) => {
            if ( params == undefined){
              params = {}
            }
            params.mode = 'success'
            notify({body , params })
          })
        }
      }

    } , [ovenify.ready])

    const notify = ({ body , params}) =>
    
      dispatchToast(
        <Toast>
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>Dismiss</Link>
              </ToastTrigger>
            }
          >
            {timeout >= 0 ? body : `Dismiss manually`}
          </ToastTitle>
        </Toast>,
        { position:'top' , timeout, intent: params.mode}
      );
  
    return (
      <>
        <Toaster
          ref={_ref}
          toasterId={toasterId}
          position="top-end"
          pauseOnHover
          pauseOnWindowBlur
          timeout={timeout}
        />
      </>
    );
  };

  export default FluentComponent