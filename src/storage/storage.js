// Save data on local storage
const setItem = async (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log("Error while saving data on local storage: ", error);
    }
}

// Get data from local storage
const getItem = async (key) => {
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
const removeItem = async (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log("Error while deleting data from local storage: ", error);
    }
}

// Storage functions for keys
export const getKeys = async () => {
    getItem('keys');
};

export const storeKeys = async (keys) => {
    setItem('keys', keys);
};

export const removeKeys = async () => {
    removeItem('keys');
};

// Storage functions for contacts
export const getContacts = async () => {
    getItem('contacts');
};

export const storeContacts = async (contacts) => {
    setItem('contacts', contacts);
};

export const removeContacts = async () => {
    removeItem('contacts');
};

