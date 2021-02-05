// import fetch from '../services/csrf';

// ================= State =================================
const initialState = {
    authenticated: false,
    closetOwner: null,
    someoneElsesCloset: null
}

// ================== Action Types =========================
const IS_AUTHENTICATED = "user/IS_AUTHENTICATED";
const NOT_AUTHENTICATED = "user/NOT_AUTHENTICATED";
const SET_CLOSET_OWNER = 'user/SET_CLOSET_OWNER';
const REMOVE_USER = 'user/removeUser';

//================== POJO Actions ==========================
const setClosetOwner = (user) => {
    return {
        type: SET_CLOSET_OWNER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const isAuthenticated = () => ({
    type: IS_AUTHENTICATED,
    payload: true
})

export const notAuthenticated = () => ({
    type: NOT_AUTHENTICATED,
    payload: false
})

// =================== Action Thunks ======================




// export const authenticate = async () => {
//     const response = await fetch('/api/auth/', {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     return await response.json();
// }

// export const login = async (email, password) => {
//     const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email,
//             password
//         })
//     });
//     return await response.json();
// }

// export const logout = async () => {
//     const response = await fetch("/api/auth/logout", {
//         headers: {
//             "Content-Type": "application/json",
//         }
//     });
//     return await response.json();
// };


// export const signUp = async (username, email, password) => {
//     const response = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             username,
//             email,
//             password,
//         }),
//     });
//     return await response.json();
// }





//========================================================
export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(isAuthenticated());
        await dispatch(setClosetOwner(data));
        console.log(data.id)
        return data.id;
    }
};

export const signUp = ({ username, email, password }) => async dispatch => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(isAuthenticated());
        dispatch(setClosetOwner(data));
        return data.id;
    };
}


// export const logout = () => async (dispatch) => {
//     const response = await fetch('/api/session', {
//         method: 'DELETE',
//     });
//     dispatch(removeUser());
//     return response;
// };


// export const restoreUser = () => async dispatch => {
//     const res = await fetch('/api/session');
//     dispatch(setUser(res.data.user));
//     return res;
// };


const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_CLOSET_OWNER:
            return {
                ...state,
                closetOwner: action.payload
            };
        case IS_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            };
        case NOT_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            };
        case REMOVE_USER:
            return {
                state: initialState    // Check that this is possible?
            }
        default:
            return state;
    }
};

export default userReducer;
