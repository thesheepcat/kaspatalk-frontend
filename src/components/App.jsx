import SidePanel from './SidePanel/SidePanel.jsx'
import MainWindow from './MainWindow/MainWindow.jsx'
import styles from "./App.module.css"
import { GeneralContextProvider } from './contextProviders/GeneralContextProvider.jsx'
import { useEffect, useState } from 'react'
import { addressFromPrivateKey} from "../utils/conversions.js";
import { USER_PRIVATE_KEY, NETWORK_ID} from "../../userSettings.js";

 
function App() {  
  const [networkIdentifier, setNetworkIdentifier] = useState(NETWORK_ID);
  const [peersList, setPeersList] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState("");
  const [userPrivkey, setUserPrivkey] = useState(USER_PRIVATE_KEY);
  const [userPubkey, setUserPubkey] = useState("");
  const [userAddress, setUserAddress] = useState("");
  
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
    updateUserAddress: updateUserAddress
    }

  useEffect(() => {
    if (userPrivkey != undefined) {
      console.log("App component have been loaded for the first time");
      updateUserAddress(userPrivkey);
    }
  },[userPrivkey])
 
  return (
    <GeneralContextProvider.Provider value={generalContextValue}>      
      <main className={styles.main}>
        <SidePanel />
        <MainWindow />
      </main>
    </GeneralContextProvider.Provider>
  )
}

export default App
