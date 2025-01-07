export const BothMessagesStyle = {
    borderRadius: '1rem',
    width: 'fit-content',
    padding: '0.5rem 1rem',
    boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.3)',
    display: 'flex',
    gap: '1rem',
    position: 'relative',
}
export const ReceivedMessageContainerBoxStyle={
    backgroundColor: '#eee',
    '&::before': {

        content: '""',
        position: 'absolute',
        top: 0,
        left: '-1rem',
        borderTop: '1rem solid #ffffff',
        border: '1rem solid transparent',
    }
}
export const SentMessageContainerBoxStyle={
    backgroundColor: '#eeeeee',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: '-1rem',
        border: '1rem solid transparent',
        borderTop: '1rem solid #eeeeee',
    }
}
export const MessageTextContainerTypographyStyle={
    display: 'block',
    fontSize: '1rem',
    maxWidth: '200px',
    overflowWrap: 'break-word',
}
export const MessageTimeContainerTypographyStyle={
    fontSize: '0.7rem',
    color: '#707579',
    alignSelf: 'flex-end',
    marginBottom: '-0.35rem',
    marginRight: '-0.3rem',
}