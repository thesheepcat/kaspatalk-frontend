import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useContext } from "react";
import { GeneralContextProvider } from "../ContextProviders/GeneralContextProvider.jsx";
import { sendTransaction } from "../../utils/sendTransaction.js";
import { encryptMessage } from "../../utils/e2ee.js";
import { Box, IconButton, InputBase, Button, useMediaQuery } from "@mui/material";

import styles from "./Header.module.css";

const Header = () => {
    const [newPeerAddress, setNewPeerAddress] = useState("");
    const [messageArea, setMessageArea] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { userPrivKey, networkIdentifier, kaspaNodeWrpc, updateOpenMenuDrawer } = useContext(GeneralContextProvider);

    const modalRef = useRef(null);
    const searchModalRef = useRef(null);

    const isSmallScreen = useMediaQuery("(max-width:900px)");

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const openSearchModal = () => {
        if (searchModalRef.current) {
            searchModalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
            setNewPeerAddress("");
            setMessageArea("");
        }
    };

    const closeSearchModal = () => {
        if (searchModalRef.current) {
            searchModalRef.current.close();
            setSearchQuery("");
        }
    };

    const handleSendTransactionButton = async (userPrivKey, networkIdentifier, newPeerAddress, messageArea) => {
        try {
            const [encryptedMessage, ivHex] = await encryptMessage(userPrivKey, messageArea, newPeerAddress);
            const encryptedPayload = encryptedMessage + "|" + ivHex;
            await sendTransaction(userPrivKey, newPeerAddress, encryptedPayload, networkIdentifier, kaspaNodeWrpc);
            closeModal();
        } catch (sendingTransactionError) {
            console.log("sendingTransactionError", sendingTransactionError);
        }
    };

    return (
        <>
            <Box
                sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                className={styles.sidePanelHeader}>

                {isSmallScreen ? (
                    //small screen visualization
                    <>
                        <IconButton onClick={() => updateOpenMenuDrawer(true)}>
                            <FontAwesomeIcon icon={faBars} className={styles.headerButtonIcon} />
                        </IconButton>
                        <IconButton onClick={openSearchModal}>
                            <FontAwesomeIcon icon={faSearch} className={styles.headerButtonIcon} />
                        </IconButton>
                        <IconButton onClick={openModal}>
                            <FontAwesomeIcon icon={faPen} className={styles.headerButtonIcon} />
                        </IconButton>
                    </>
                ) : (

                    //big screen configuration (same as before)
                    <>
                        <IconButton onClick={() => updateOpenMenuDrawer(true)}>
                            <FontAwesomeIcon icon={faBars} className={styles.headerButtonIcon} />
                        </IconButton>
                        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
                            <FontAwesomeIcon icon={faSearch} />
                            <InputBase
                                placeholder="Search"
                                sx={{ marginLeft: 1, borderBottom: "1px solid #ccc", width: "100px" }}
                            />
                        </Box>
                        <IconButton onClick={openModal}>
                            <FontAwesomeIcon icon={faPen} className={styles.headerButtonIcon} />
                        </IconButton>
                    </>
                )}
            </Box>

            {/*new convo*/}
            <dialog ref={modalRef} className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2 className={styles.modalTitle}>Start a new conversation</h2>
                    <div>
                        <label>New Peer Address:</label>
                        <input
                            type="text"
                            id="newPeerAddress"
                            value={newPeerAddress}
                            onChange={(event) => setNewPeerAddress(event.target.value)}
                            placeholder="Enter new peer address"
                            className={styles.modalInput}
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                            id="messageArea"
                            value={messageArea}
                            onChange={(event) => setMessageArea(event.target.value)}
                            placeholder="Write your message"
                            className={styles.modalTextArea}
                        />
                    </div>
                    <div className={styles.modalButtons}>
                        <button
                            onClick={() => handleSendTransactionButton(userPrivKey, networkIdentifier, newPeerAddress, messageArea)}
                            className={styles.sendButton}
                        >
                            Send Message
                        </button>
                        <button onClick={closeModal} className={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>

            {/*search modal*/}
            <dialog ref={searchModalRef} className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2 className={styles.modalTitle}>Search</h2>
                    <div>
                        <label>Search Query:</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Enter your search query"
                            className={styles.modalInput}
                        />
                    </div>
                    <div className={styles.modalButtons}>
                        <Button onClick={closeSearchModal} className={styles.closeButton}>
                            Close
                        </Button>
                        <Button
                            onClick={() => console.log("Cerca:", searchQuery)}
                            className={styles.sendButton}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Header;