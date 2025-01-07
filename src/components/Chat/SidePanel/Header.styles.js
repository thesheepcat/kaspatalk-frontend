export const SidePanelHeaderContainerBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    backgroundColor: '#ffffff',
    height: '5rem',
    padding: '0 0.8rem',
}
export const HeaderButtonContainerBoxStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '60%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#f5f5f5ef',
    },
}
export const HeaderButtonContainerStyledFontAwesomeIconStyle = {
    position: 'absolute',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease-in-out',
}
export const SearchBoxContainerBoxStyle = {
    position: 'relative',
    border: '0.1rem solid #dfe1e5',
    borderRadius: '2.2rem',
    width: '100%',
    padding: '0.8rem 0.6rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    transition: 'all 0.3s ease-in-out',
}
export const SearchBoxIconContainerStyledFontAwesomeIconStyle = {
    fontSize: '1.2rem',
    color: '#707579',
    opacity: 0.6,
}
export const SearchBoxInputContainerInputStyle = {
    position: 'relative',
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '1rem',
    color: '#474747',
    opacity: 0.8,
    '&::placeholder': {
        fontSize: '1rem',
        fontWeight: 500,
        opacity: 0.8,
        color: '#707579',
    },

}
export const ModalContainerDialogStyle = {
    width: 'fit-content',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1300,
    backgroundColor: 'transparent',
    backdropFilter: 'transparent',
}
export const ModalContentContainerBoxStyle = {
    padding: '40px',

}
export const ModalTitleContainerDialogTitleStyle = {
    position: 'relative',
    alignSelf: 'center',
    color: 'black',
}
export const ModalInputContainerInputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
}
export const ModalButtonsContainerBoxStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
}
export const SendButtonContainerButtonStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
        backgroundColor: '#45a049',
    },
    width: '150px',
}
export const CloseButtonContainerButtonStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f44336',
    color: 'white',
    '&:hover': {
        backgroundColor: '#e53935',
    },
    width: '150px'
}