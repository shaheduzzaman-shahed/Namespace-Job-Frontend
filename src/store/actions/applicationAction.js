import axios from '../../config/axios'


export const fetchApplications = (token) =>{
    return (dispatch) => {
        dispatch({type: 'APPLICATION_LOADING'})
        axios.get(`getCompanyApplications`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            console.log(res.data)
            dispatch({type:'FETCH_APPLICATIONS_SUCCESS', payload: {data: res.data}})
        }).catch((err) => {
            console.log("err ", err.response.data)
            dispatch({ type: 'FETCH_APPLICATONS_ERROR', payload: {error: err.response.data} });
        })
    }
}
