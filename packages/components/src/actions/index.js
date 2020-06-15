
export const updateUtils = (macAddress, isNative ) => {
    return {
        type: 'SET_UTILS',
        mac: macAddress,
        native: isNative,
    };
};

export const updateAuth = data => {
    return {
        type: 'AUTH',
        payload: data
    };
};

