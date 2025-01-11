// Save data on local storage
const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.log("Error while saving data on local storage: ", error);
        return false;
    }
}

// Get data from local storage
const getItem = (key) => {
    let valueRaw;
    try {
        valueRaw = localStorage.getItem(key);
    } catch (error) {
        console.log("Error while getting data from local storage: ", error);
    }

    if (valueRaw !== null) {
        try {
            return JSON.parse(valueRaw);
        } catch (error) {
            console.log("Error while converting value from database to JSON object: ", error);
        }
    }
    return null;
}

// Remove data from local storage
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log("Error while deleting data from local storage: ", error);
    }
}
//check if Keyname is in DB and returns true or false
export const checkObjectInDb = (dictName, keyName) => {
    let shellObject = getItem(dictName);
    if (shellObject !== null) {
        try {
            let keyToCheck = shellObject[keyName]
            return keyToCheck !== null && keyToCheck !== undefined && keyToCheck !== "";
        }
        catch {
            return false;
        }
    }
}

export const getObjectFromDb = (keys) => {
    return getItem(keys);
};

export const getKeyValueFromDbObject = (dictName, key) => {
    return getItem(dictName)[key];
}

export const storeObjectInDb = (key, value) => {
    setItem(key, value);
};

export const removeKeyPairFromDb =  (dictName, keyToDelete) => {

    if(checkObjectInDb(dictName, keyToDelete)) {
        return setItem(dictName, ((obj) => { delete obj[keyToDelete]; return obj; })(getItem(dictName)));
    }
};
// Storage functions for keys
export const getKeys = async () => {
    getItem('keys');
};

export const storeKeys = async (keys) => {
    setItem('keys', keys);
};

export const removeKeys = async () => {
    removeItem('keys');}

// // Storage functions for contacts
// export const getContacts = async () => {
//     getItem('contacts');
// };
//
// export const storeContacts = async (contacts) => {
//     setItem('contacts', contacts);
// };
//
// export const removeContacts = async () => {
//     removeItem('contacts');
// };
//
