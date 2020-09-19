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
            console.log("err ", err.response)
            dispatch({ type: 'FETCH_POSTS_ERROR', payload: {error: err.response} });
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

export const deletePost = (id, token) => {
    return (dispatch) => {
        dispatch({type: 'POST_LOADING'})
        axios.delete(`post/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            dispatch({type:'DELETE_POST_SUCCESS', payload: {data: res.data}})
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({type:'DELETE_POST_ERROR', payload: {error: err.response.data}})
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

