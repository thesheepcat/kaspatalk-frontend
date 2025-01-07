import Message from "./Message.jsx";
import {useRef, useEffect, useContext, useState} from "react";
import { GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx";
import Box from "@mui/material/Box";
import {ChatContainerBoxStyle, MessagListContainerStyle} from "./ChatContainer.styles.js";

const ChatContainer = () => {
    const messageListRef = useRef(null);
    const chatContainerRef = useRef(null);
    const bottomDivRef = useRef(null);
    const {selectedPeer, userAddress} = useContext(GeneralContextProvider);
    const [ messages, setMessages ] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);



    const handleWheel = () => {
        const scrollTop = chatContainerRef.current.scrollTop;
        const scrollHeight = chatContainerRef.current.scrollHeight;
        const clientHeight = chatContainerRef.current.clientHeight;
        const scrollDistanceFromBottom = scrollHeight - clientHeight - scrollTop;
        if(scrollDistanceFromBottom > 5){
            setIsScrolled(true);
            return;
        }
        setIsScrolled(false);

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


    const scrollToBottom = () => {
        if (!isScrolled) {
            bottomDivRef.current.scrollIntoView({behavior: 'smooth', block: 'end' });
        }
    }

    useEffect(() => {
            const intervalId = setInterval(scrollToBottom, 100);
            return () => {
                clearInterval(intervalId);
            };
        }, [isScrolled]);

    return(
        <Box
             sx={ChatContainerBoxStyle}
             ref={chatContainerRef}
             onWheel={handleWheel}>
            <Box
                 sx={MessagListContainerStyle}
                 ref={messageListRef}>
                {messages.map((messageObj, i) => (<Message isReceivedMessage={(messageObj.receiver === userAddress) ? true : false} encryptedPayload={messageObj.message} timestamp={messageObj.block_time} key={i}/> ))}
            </Box>
            <div ref={bottomDivRef}></div>
        </Box>

    )
}

export default ChatContainer

