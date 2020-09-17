import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../store/actions/postAction'
import {Card, Button, Spinner} from 'react-bootstrap'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

function LandingPage(props) {
    const [loginState, setLoginState] = useState(false)
    useEffect(() => {
        props.fetchPosts()
    }, [])
    
    const auth = props.auth
    const handleApply = () =>{
        if(!auth.isLoggedIn){
            setLoginState(true)
        }else{

        }
    }
    return (
        <div className="col-md-8 m-auto">
        {loginState ? <Redirect push to="/login" /> : null}
        { props.loading ? (
            <h3 className="text-center mt-5">loading... <Spinner animation="grow" variant="primary" /></h3>
        )
        :
        props.posts.map((post) => (
            <Card className="mb-4" key={post.id}>
                <Card.Header className="">
                <h5>{post.title}</h5>
                <p><span className="font-weight-bold">Company : </span>{post.company.first_name} {post.company.last_name}</p>
                </Card.Header>
                <Card.Body>
                    <span className="font-weight-bold">Description : </span>
                    <Card.Text>
                        {post.description}
                    </Card.Text>
                    <p><span className="font-weight-bold">Salary : </span>{post.salary}</p>
                    <p><span className="font-weight-bold">Location : </span>{post.location} {post.country}</p>
                </Card.Body>
                <Card.Footer className="text-muted">

                {auth.isLoggedIn ? 
                    auth.profile.id == post.id ?
                    <Button variant="primary" disabled>Already Applied</Button> : 
                    auth.profile.is_company ? null :
                    <Button variant="primary" onClick={handleApply}>Apply Now</Button>
                
                : <Button variant="primary" onClick={handleApply}>Apply Now</Button>

                }
                <span  className="float-right">posted: {moment(post.created_at, "YYYYMMDD").fromNow()} </span>
                </Card.Footer>
            </Card>
        ))
        }
        </div>
    )
}

const mapstateToProps = (state) => {
    return {
        posts: state.post.items,
        loading: state.post.loading,
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => {dispatch(fetchPosts())}
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(LandingPage)
