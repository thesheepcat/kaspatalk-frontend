

export const MessageBoxContainerBoxStyle = {
    bottom: '3rem',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    gap: '2rem',
    height: 'fit-content',
    marginTop: '1rem',
}
export const MessageContentContainerBoxStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    padding: '0.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    height: 'fit-content',
    boxShadow: '1px 1px 5px 0px rgba(0, 0, 0, 0.3)',
    minWidth: '30rem',
}
export const EmojiButtonContainerBoxStyle = {

    borderRadius: '50%',
    backgroundColor: '#ffffff',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}
export const EmojiButtonIconContainerIconButtonStyle = {
    color: '#797071FF',
    opacity: 0.7,
}
export const MessageInputContainerTextAreaAutosizeStyle = {
    backgroundColor: '#000000',
    fontSize: '1.2rem',
    padding: '0.5rem',
    outline: 'none',
    border: 'none',
    fontFamily: 'system-ui',
    overflowWrap: 'break-word',
    overflow: 'hidden',

}
export const IsSendingMessageIconVisibleContainerIconButtonStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#707579',
    opacity: 0.7,
}
export const IsSendingMessageIconHiddenContainerIconButtonStyle = {
    visibility: 'hidden',
}
export const SendButtonContainerButtonStyle = {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    borderColor: 'transparent',
    boxShadow: '1px 1px 5px 0px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#6dc1b4',
    color: '#ffffff',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.5s ease, background-color 0.5s ease',
    '&:active': {
        transform: 'scale(0.85)',
        backgroundColor: '#4e867e',
    },
    '&disabled': {
        backgroundColor: '#cccccc',
        color: '#a5a5a5',
        cursor: 'not-allowed',
    }
}
export const SendButtonIconContainerIconButtonStyle = {
    width: "40%",
    height: "40%"
}