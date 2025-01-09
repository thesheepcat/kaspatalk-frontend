export const ListItemShellContainerBoxStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gap: "16px",
    width: "100%",
    padding: "8px",
    border: "1px solid grey",
    borderRadius: "5px",
};


export const BothActionsContainerButtonStyle = {
    display: 'flex',
    gap: '10px',
}
export const ConfirmButtonContainerButtonStyle = {
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
        backgroundColor: '#45a049',
    },
    width: '70px',
}
export const CancelButtonContainerButtonStyle = {
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f44336',
    color: 'white',
    '&:hover': {
        backgroundColor: '#e53935',
    },
    width: '70px'
}