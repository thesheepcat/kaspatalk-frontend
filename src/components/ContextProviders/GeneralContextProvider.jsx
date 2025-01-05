
import { createContext } from "react";

export const GeneralContextProvider = createContext({
    networkIdentifier : "",    
    peers : [],
    updatePeers: () => {},
    selectedPeer: "",
    selectPeer: () => {},
    userPrivKey: "",
    updateUserPrivateKey: () => {},
    userPubKey: "",
    userAddress: "",
    updateUserAddress: () => {},
    kaspaNodeWrpc: "",
    openMenuDrawer : undefined,
    updateOpenMenuDrawer : () => {}
});