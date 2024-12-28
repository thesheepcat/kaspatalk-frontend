import PropTypes from 'prop-types';
import styles from "./Message.module.css"

const Message = ({isReceivedMessage, messageText, timestamp}) => {
    return (
        <div className={isReceivedMessage == true ? styles.receivedMessage : styles.sentMessage}>
            <span className={styles.messageText}>{messageText} </span>
            <span className={styles.messageTime}>{timestamp}</span>
        </div>
    )
}

export default Message

Message.propTypes = {
    isReceivedMessage: PropTypes.bool.isRequired,
    messageText: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
};