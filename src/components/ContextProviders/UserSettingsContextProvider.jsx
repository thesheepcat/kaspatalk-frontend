import { createContext } from "react";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NETWORK_ID, KASPA_NODE_WRPC } from "../../../userSettings.js";

export const UserSettingsContext = createContext();

const UserSettingsContextProvider = ({children}) => {
  const [networkIdentifier, setNetworkIdentifier] = useState(NETWORK_ID);
  const [kaspaNodeWrpc, setKaspaNodeWrpc] = useState(KASPA_NODE_WRPC);   
 
  const value = {
    networkIdentifier,
    setNetworkIdentifier,
    kaspaNodeWrpc,
    setKaspaNodeWrpc
  }
  
  return(
      <UserSettingsContext.Provider value={value}>
          {children}
      </UserSettingsContext.Provider>
  );
};

export default UserSettingsContextProvider;

UserSettingsContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};