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
const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log("Error while deleting data from local storage: ", error);
    }
}

// Storage functions for keys
export const getObjectFromDb = (keys) => {
    return getItem(keys);
};
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
export const getKeyValueFromDbObject = (dictName, key) => {
    return getItem(dictName)[key];
}

export const storeObjectInDb = (key, value) => {
    setItem(key, value);
};

export const removeKeys =  () => {
    removeItem('keys');
};

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
