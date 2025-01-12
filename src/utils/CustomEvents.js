export const newAliasEvent = (newAlias, address) => {
    return new CustomEvent('newAlias', {
        detail: {
            message: "New Alias",
            newAlias: newAlias,
            address: address
        }
    })};