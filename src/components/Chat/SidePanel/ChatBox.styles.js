export const ChatBoxContainerBoxStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: '1rem',
    width: '100%',

    minHeight: '4rem',
    cursor: 'pointer',
    transition: 'all .3s ease',
    '&:hover': {
        backgroundColor: 'hsl(207, 100%, 31%, 0.08)'
    },
    '&:active': {
        backgroundColor: 'hsl(170, 44%, 61%, 0.60)'
    }

}
export const SelectedChatBoxContainerBoxStyle= {
    backgroundColor: 'hsl(170, 44%, 61%, 0.60)'
}
export const ChatImageSmallScreenContainerImageListItemStyle = {
    borderRadius: '50%',
    maxWidth: '4rem',
    objectFit: 'cover'
}
export const ChatImageContainerBoxStyle = {
    flexBasis: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}
export const ChatImageBigScreenContainerImageListItemStyle = {
    borderRadius: '50%',
    width: '3rem',
    objectFit: 'cover'
}
export const ChatDetailsContainerBoxStyle = {
    flexBasis: '85%',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem'
}
export const ChatTitleContainerBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontSize: '0.8rem'
}
export const BothH3TitleAndChatTileStyle = {

    fontSize: '1rem',
    fontWeight: 500,


}