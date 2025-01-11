import { createContext } from "react";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { USER_PRIVATE_KEY, USER_ADDRESS } from "../../../userSettings.js";

export const UserKeysContext = createContext();

const UserKeysContextProvider = ({children}) => {
  // const [userPrivateKey, setUserPrivatekey] = useState(USER_PRIVATE_KEY);
  const [userPrivateKey, setUserPrivatekey] = useState("");
  const [userPublicKey, setUserPublicKey] = useState("");
  //const [userAddress, setUserAddress] = useState(USER_ADDRESS);
  const [userAddress, setUserAddress] = useState("");
 
  const value = {
    userPrivateKey,
    setUserPrivatekey,
    userPublicKey,
    setUserPublicKey, 
    userAddress,
    setUserAddress
  }
  
  return(
      <UserKeysContext.Provider value={value}>
          {children}
      </UserKeysContext.Provider>
  );
};

export default UserKeysContextProvider;

UserKeysContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};