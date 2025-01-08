import { createContext } from "react";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { addressFromPrivateKey} from "../../utils/conversions.js";
import { USER_PRIVATE_KEY, NETWORK_ID, KASPA_NODE_WRPC} from "../../../userSettings.js";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {
    
    const [networkIdentifier, setNetworkIdentifier] = useState(NETWORK_ID);
    const [kaspaNodeWrpc, setKaspaNodeWrpc] = useState(KASPA_NODE_WRPC);
    
    const [userPrivKey, setUserPrivkey] = useState(USER_PRIVATE_KEY);
    const [userPubKey, setUserPubKey] = useState("");
    const [userAddress, setUserAddress] = useState("");
    
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [peersList, setPeersList] = useState([]);
    const [selectedPeer, setSelectedPeer] = useState("");
    
    const updateUserAddress = async (userPrivatekey) => {
        const userAddress = await addressFromPrivateKey(userPrivatekey, networkIdentifier)
        setUserAddress(userAddress)
    }
  
    const value = {
      networkIdentifier,
      setNetworkIdentifier,
      peersList,
      setPeersList,
      selectedPeer,
      setSelectedPeer,
      userPrivKey,
      setUserPrivkey,
      userPubKey,
      setUserPubKey, 
      userAddress,
      updateUserAddress: updateUserAddress,
      kaspaNodeWrpc,
      setKaspaNodeWrpc,
      openMenuDrawer,
      setOpenMenuDrawer
    }
  
    useEffect(() => {
      if (userPrivKey != undefined) {
        updateUserAddress(userPrivKey);
      }
    },[userPrivKey]);

    return(
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContextProvider;

GeneralContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};