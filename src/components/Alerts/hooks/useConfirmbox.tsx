import { AlertsContext } from "../main";
import { useContext } from "react";

export const useConfirmBox = () => {
    return useContext(AlertsContext);
  };