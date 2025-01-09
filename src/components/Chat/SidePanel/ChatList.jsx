import ChatBox from "./ChatBox";
import styles from "./ChatList.module.css";
import {useContext, useEffect} from "react";
import { GeneralContext } from "../../ContextProviders/GeneralContextProvider";
import { UserKeysContext } from "../../ContextProviders/UserKeysContextProvider.jsx"

const ChatList = () => {
    const { peersList, setPeersList }= useContext(GeneralContext);
    const { userAddress }= useContext(UserKeysContext);

    const fetchPeers = async () => {
        try {
          const endpoint = "/api/get-peers?address=" + userAddress // #TODO
          const response = await fetch(endpoint);
          //console.log(response);
          if (!response.ok) {
            throw new Error('Failed to fetch peers');
          } 
          const fetchedPeers = await response.json();
          setPeersList(fetchedPeers);
        } catch (responseError) {
            console.log(responseError)
        }
      };

    // Fetch peers every 10 seconds
    useEffect(() => {
      if (userAddress) {
        fetchPeers();
        const intervalId = setInterval(fetchPeers, 10000);
        // Cleanup function to clear the interval on component unmount
        return () => {
          clearInterval(intervalId);
        };
      }}, [userAddress]);
    return(
        <div className={styles.ChatList}>
            {(peersList.length > 0) ? peersList.map((peer, i) => (<ChatBox key={i} peerName={peer}></ChatBox>)) : ""}
        </div>
    );
}

export default ChatList;