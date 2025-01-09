import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from 'react';
import loadKaspaSDK from "../../kaspa-wasm32-sdk/web/kaspa/kaspa.js";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [peersList, setPeersList] = useState([]);
    const [selectedPeer, setSelectedPeer] = useState("");

    const value = {
      peersList,
      setPeersList,
      selectedPeer,
      setSelectedPeer,
      openMenuDrawer,
      setOpenMenuDrawer
    }

    useEffect(() => {
        loadKaspaSDK();
    }, [])

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