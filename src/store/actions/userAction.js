import axios from '../../config/axios'

export const updateUser = (data, token) => {
    return (dispatch) => {
        console.log(data)
        dispatch({type: 'USER_LOADING'})
        let formData = new FormData();
        formData.append('_method', 'PUT');

        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        if(data.image){
            formData.append('image',data.image[0])
        }
        if(data.resume){
            formData.append('resume',data.resume[0])
        }
        axios.post(`updateUser/${data.id}`, 
          formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            },
        }).then((res) => {
            console.log(res.data)
            dispatch({type:'UPDATE_USER_SUCCESS', payload: {data: res.data}})
        }).catch((err) => {
            console.log("bal ", err.response.data)
            dispatch({type:'UPDATE_USER_ERROR', payload: {error: err.response.data}})
        })
    }
}