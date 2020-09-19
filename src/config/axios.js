import axios from 'axios'

export default axios.create({
    baseURL : 'https://jobsforjob.herokuapp.com/api'
})