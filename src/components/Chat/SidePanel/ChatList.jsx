import ChatBox from "./ChatBox";
import {useContext, useEffect} from "react";
import { GeneralContextProvider } from "../../ContextProviders/GeneralContextProvider";
import Box from "@mui/material/Box";
import {ChatListContainerBoxStyle} from "./ChatList.styles.js";

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
        <Box className={"styles.ChatList"} sx={ChatListContainerBoxStyle}>
            {(peers.length > 0) ? peers.map((peer, i) => (<ChatBox key={i} peerName={peer}></ChatBox>)) : ""}
        </Box>
    );
}

export default ChatList;