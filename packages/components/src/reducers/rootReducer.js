const initialState = {
    token: "",
    useraddress: "",
    emailAddress: "",
    macAddress: "empty",
    isNative: true,
};

function rootReducer(state = initialState, action) {
    console.log("after dispatch " + state.macAddress);
    switch (action.type) {
        case "AUTH":
            return Object.assign({}, state, { useraddress: action.payload.useraddress, token: action.payload.systemtoken, emailAddress: action.payload.data.emailaddress })
        case "SET_UTILS":
            return Object.assign({}, state, { macAddress: action.mac, isNative: action.native })
        default:
            return state;
    }

};

export default rootReducer;