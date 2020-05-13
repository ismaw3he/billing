const initialState = {
    username: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    loggedIn: false,
    isAdmin: false,
    isUser: false,
    mainPage: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN_ADMIN":
            return {
                ...state,
                isAdmin: action.isAdmin,
                isUser: action.isUser,
                loggedIn: action.loggedIn,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case "LOGOUT_ADMIN":
            return {
                ...state,
                isAdmin: action.isAdmin,
                isUser: action.isUser,
                loggedIn: action.loggedIn,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case "LOGIN_USER":
            return {
                ...state,
                isAdmin: action.isAdmin,
                isUser: action.isUser,
                loggedIn: action.loggedIn,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case "LOGOUT_USER":
            return {
                ...state,
                isAdmin: action.isAdmin,
                isUser: action.isUser,
                loggedIn: action.loggedIn,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case "USERNAME_CHANGE":
            return {
                ...state,
                username: action.element.value,
                isAdmin: action.isAdmin,
                isUser: action.isUser
            };
        case "PASSWORD_CHANGE":
            return {
                ...state,
                password: action.element.value,
                isAdmin: action.isAdmin,
                isUser: action.isUser
            };
        default:
            return state;
    }
};

export default reducer;
