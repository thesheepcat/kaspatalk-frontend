import styles from "./ChatContainer.module.css";
import Message from "./Message.jsx";
import {useRef, useEffect, useContext, useState} from "react";
import { GeneralContextProvider} from "../ContextProviders/GeneralContextProvider.jsx";

const ChatContainer = () => {
    const messageListRef = useRef(null);   
    const {selectedPeer, userAddress} = useContext(GeneralContextProvider);
    const [ messages, setMessages ] = useState([]);

    const fetchMessages = async () => {
        try {
            const messagesEndpoint = "/api/get-messages?address_1=" + selectedPeer + "&address_2=" + userAddress // #TODO
            const response = await fetch(messagesEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
        } 
            const fetchedMessages = await response.json();
            setMessages(fetchedMessages);
        } catch (responseError) {
            console.log(responseError)
        }
      };
    
    // Fetch messages every 10 seconds
    useEffect(() => {
        if (selectedPeer != ""){
            fetchMessages();
        }
        const intervalId = setInterval(fetchMessages, 3000);
        // Cleanup function to clear the interval on component unmount
        return () => {
          clearInterval(intervalId);
        };
        
      }, [selectedPeer]);

    return(
        <div className={styles.chatContainer}>
            <div className={styles.messageList} ref={messageListRef}>
                {messages.map((messageObj, i) => (<Message isReceivedMessage={(messageObj.receiver == userAddress) ? true : false} encryptedPayload={messageObj.message} timestamp={messageObj.block_time} key={i}/> ))}
            </div>
        </div>
    )

}

export default ChatContainer


    /* #TODO
    useEffect(() => {
        // Scroll to the bottom after the component has mounted and items are added
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
    }, []);
    */

