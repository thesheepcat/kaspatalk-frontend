import styles from "./ChatContainer.module.css";
import Message from "./Message.jsx";
import {useRef, useEffect, useContext, useState} from "react";
import { GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx";

const ChatContainer = () => {
    const messageListRef = useRef(null);
    const chatContainerRef = useRef(null);
    const {selectedPeer, userAddress} = useContext(GeneralContextProvider);
    const [ messages, setMessages ] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleWheel = () => {
        const scrollTop = chatContainerRef.current.scrollTop;
        const scrollHeight = chatContainerRef.current.scrollHeight;
        const clientHeight = chatContainerRef.current.clientHeight;
        const scrollDistanceFromBottom = scrollHeight - clientHeight - scrollTop;
        //console.log(scrollDistanceFromBottom);
        if(scrollDistanceFromBottom > 5){
            setIsScrolled(true);
            //console.log(isScrolled);
            return;
        }
        setIsScrolled(false);
        //console.log("isScrolled: ", isScrolled);

    }
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

    //every time message changes it makes sure to scroll to the bottom
    useEffect(() => {
        if(!isScrolled){
            messageListRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        }
    }, [messages]);

    return(
        <div className={styles.chatContainer}
             ref={chatContainerRef}
             onWheel={handleWheel}>
            <div id={"chatBox"} className={styles.messageList} ref={messageListRef}>
                {messages.map((messageObj, i) => (<Message isReceivedMessage={(messageObj.receiver === userAddress) ? true : false} encryptedPayload={messageObj.message} timestamp={messageObj.block_time} key={i}/> ))}
            </div>
        </div>
    )
}

export default ChatContainer

