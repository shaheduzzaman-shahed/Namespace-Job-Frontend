import axios from '../../config/axios'


export const fetchPosts = () =>{
    return (dispatch) => {
        dispatch({type: 'POST_LOADING'})
        axios.get(`getAllPost`, {
            headers: {
                "Accept": "application/json",
            }
        }).then((res) => {
            console.log(res.data)
            dispatch({type:'FETCH_POSTS_SUCCESS', payload: {data: res.data}})
        }).catch((err) => {
            console.log("err ", err.response.data)
            dispatch({ type: 'FETCH_POSTS_ERROR', payload: {error: err.response.data} });
        })
    }
}

export const addPost = (data, token) => {
    return (dispatch) => {
        dispatch({type: 'POST_LOADING'})
        axios.post(`post`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            dispatch({type:'ADD_POST_SUCCESS', payload: {data: res.data}})
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({type:'ADD_POST_ERROR', payload: {error: err.response.data}})
        })
    }
}
export const editCoupon = (data, token) => {
    return (dispatch) => {
        dispatch({type: 'COUPON_LOADING'})
        axios.put(`coupon/${data.id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            dispatch({type:'UPDATE_COUPON_SUCCESS', payload: {data: res.data.result}})
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({type:'UPDATE_COUPON_ERROR', payload: {error: err.response.data}})
        })
    }
}
export const deleteCoupon = (id, token) => {
    return (dispatch) => {
        dispatch({type: 'COUPON_LOADING'})
        axios.delete(`coupon/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            dispatch({type:'DELETE_COUPON_SUCCESS', payload: {data: res.data.result}})
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({type:'DELETE_COUPON_ERROR', payload: {error: err.response.data}})
        })
    }
}
export const applyJob = (id, token) => {
    return (dispatch) => {
        dispatch({type: 'POST_LOADING'})
        axios.get(`applyJob/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            dispatch(fetchPosts())
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({type:'APPLY_JOB_ERROR', payload: {error: err.response.data}})
        })
    }
}

