const initialState = {
    username: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    loggedIn: false,
    isAdmin: false,
    isUser: false,
    mainPage: null,

    accounts: [
        {
            fullname: "Rauf Ismayilov",
            username: "raymond",
            password: "21091997Acun"
        },
        {
            fullname: "Asif Ismayilov",
            username: "asif",
            password: "PortNetFlix"
        },
        {
            fullname: "Movsum Nuriyev",
            username: "movsum",
            password: "movsum5555"
        },
        {
            fullname: "Nicat Qehremanov",
            username: "nicat",
            password: "nicat095"
        },
        {
            fullname: "Ferhad Alizade",
            username: "ferhad",
            password: "ferhad98765"
        }
        ,
        {
            fullname: "Murad Abbasov",
            username: "murad",
            password: "1488"
        }
    ],
    user: null,
    usernameNew: null,
    passwordNew: null,
    loggedInNew: false,

    editUser: "test"
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




        case "USERNAME_INPUT_CHANGE":
            return {
                ...state,
                usernameNew: action.payload
            };
        case "PASSWORD_INPUT_CHANGE":
            return {
                ...state,
                passwordNew: action.payload
            };
        case "LOGIN_USER_NEW":

            return {
                ...state,
                user: action.user,
                loggedInNew: true
            };

        case "EDIT_USER":
            return {
                ...state,
                editUser: action.userId
            };
        default:
            return state;
    }
};

export default reducer;
