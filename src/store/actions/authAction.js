import axios from '../../config/axios'
export const signin = (credentials) => {
    return (dispatch) => {
        dispatch({type: 'AUTH_LOADING'})
        axios.post(`login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }).then((res) => {
            dispatch(getUser (res.data.access_token))
        }).catch((err) => {
             console.log("bal ", err.response.data)
            dispatch({ type: 'SIGNIN_ERROR', payload: {error: err.response.data} });
        })
    }
}
export const signup = (newUser) => {
    return (dispatch) => {
        axios.post(`register`, newUser, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }).then((res) => {
            console.log(res)
            dispatch(getUser (res.data.access_token))
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({ type: 'SIGNUP_ERROR', payload: {error: err.response.data} });
        })
    }
}
export const getUser = (token) => (dispatch) => {
    // console.log(res)
    axios.get(`user`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': 'Bearer ' + token,
        }
    }).then((data) => {
        console.log(data)
        let profile = data.data
        dispatch({ type: "SIGNIN_SUCCESS", payload: { token, profile } });
    }).catch((err) => {
        console.log("bal ", err.response.data)
        dispatch({ type: 'SIGNIN_ERROR', payload: {error: err.response.data} });
    });
};
export const signout = (token) => (dispatch) => {
    dispatch({type: 'AUTH_LOADING'})
    // console.log(token)
        axios.get(`logout`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            // if(res.success){
            //     localStorage.removeItem("auth")
            // }
            console.log(res)
            dispatch({ type: 'LOGOUT_SUCCESS' });
        })
        .catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({ type: 'LOGOUT_ERROR', payload: {error: err.response.data} });
        })
    
};