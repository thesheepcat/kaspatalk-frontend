import ChatBox from "./ChatBox";
import styles from "./ChatList.module.css";
import {useContext, useEffect} from "react";
import { GeneralContextProvider } from "../contextProviders/GeneralContextProvider";

const ChatList = () => {
    const { peers, updatePeers, userAddress }= useContext(GeneralContextProvider);

    const fetchPeers = async () => {
        try {
          const endpoint = "/api/get-peers?address=" + userAddress // #TODO
          const response = await fetch(endpoint);
          //console.log(response);
          if (!response.ok) {
            throw new Error('Failed to fetch peers');
          } 
          const fetchedPeers = await response.json();
          updatePeers(fetchedPeers);
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
            {(peers.length > 0) ? peers.map((peer, i) => (<ChatBox key={i} peerName={peer}></ChatBox>)) : ""}
        </div>
    );
}

export default ChatList;