import SidePanel from './SidePanel/SidePanel.jsx'
import MainWindow from './MainWindow/MainWindow.jsx'
import styles from "./App.module.css"
import { GeneralContextProvider } from './ContextProviders/GeneralContextProvider.jsx'
import { useEffect, useState } from 'react'
import { addressFromPrivateKey} from "../utils/conversions.js";
import { USER_PRIVATE_KEY, NETWORK_ID, KASPA_NODE_WRPC} from "../../userSettings.js";
import MenuDrawer from './MenuDrawer/MenuDrawer.jsx';
 
function App() {  
  const [networkIdentifier, setNetworkIdentifier] = useState(NETWORK_ID);
  const [peersList, setPeersList] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState("");
  const [userPrivkey, setUserPrivkey] = useState(USER_PRIVATE_KEY);
  const [userPubkey, setUserPubkey] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [kaspaNodeWrpc, setKaspaNodeWrpc] = useState(KASPA_NODE_WRPC);
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  
  const updatePeers = (peers) => {
    setPeersList(peers);
  }

  const selectPeer = (peer) => {
    setSelectedPeer(peer)
  }

  const updateUserPrivateKey = (privateKey) => {
    setUserPrivkey(privateKey)
  }

  const updateUserAddress = async (userPrivatekey) => {
    const userAddress = await addressFromPrivateKey(userPrivatekey, networkIdentifier)
    setUserAddress(userAddress)
  }
  
  const updateOpenMenuDrawer = (openDrawer) => {
    setOpenMenuDrawer(openDrawer)
  }

  const generalContextValue = {
    networkIdentifier: networkIdentifier,
    peers : peersList,
    updatePeers : updatePeers,
    selectedPeer : selectedPeer,
    selectPeer : selectPeer,
    userPrivKey : userPrivkey,
    updateUserPrivateKey: updateUserPrivateKey,
    userPubKey: userPubkey,
    userAddress: userAddress,
    updateUserAddress: updateUserAddress,
    kaspaNodeWrpc : kaspaNodeWrpc,
    openMenuDrawer : openMenuDrawer,
    updateOpenMenuDrawer : updateOpenMenuDrawer
    }

  useEffect(() => {
    if (userPrivkey != undefined) {
      updateUserAddress(userPrivkey);
    }
  },[userPrivkey])
 
  return (
    <GeneralContextProvider.Provider value={generalContextValue}>      
      <main className={styles.main}>
        <MenuDrawer/>
        <SidePanel />
        <MainWindow />
      </main>
    </GeneralContextProvider.Provider>
  )
}

export default App
