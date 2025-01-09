export const ListItemShellContainerBoxStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "70rem",
    border: "1px solid grey",
    borderRadius: 5,
};
export const TypographyContainerSpanStyle = {
    display: "inline-block",
    flex: "1 0 auto",
    textAlign: "left",
};

export const AddressContainerTypographyStyle = {
    ...TypographyContainerSpanStyle,
    justifyContent: "flex-start",
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
    padding: '10px 20px',
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