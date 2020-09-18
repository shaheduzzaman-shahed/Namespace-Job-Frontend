import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, } from 'react-router-dom'
import { Spinner, Alert, Card, Image, Button, Table } from 'react-bootstrap'
import { fetchPosts } from '../../store/actions/postAction'
import AddPost from '../../components/company/AddPost'

function AllPost(props) {
    const [edit, editState] = useState(false)
    const { error, auth, loading, posts, success } = props;
    const profile = auth.profile
    // console.log(auth)
    useEffect(() => {
        if(posts.length < 1){
            props.fetchPosts(props.token)
        }
    }, [])
    if (auth.isLoggedIn) {
        if (!auth.profile.is_company) {
            return <Redirect to="/userHome" />
        }
    }
    if (loading) {
        return (<h3 className="text-center mt-5">loading... <Spinner animation="grow" variant="primary" /></h3>)
    } else {
        return (


            <div className="col-md-10 m-auto">
                {success ? <Alert variant="success">Success : {success}</Alert> : null}
                {error ? <Alert variant="danger">Error : {error.message}</Alert> : null}
                {error && error.errors ? <Alert variant="danger"> {Object.values(error.errors)}</Alert> : null}
                <Card border="success" className="mt-2">
                    <Card.Header as="h4">All Job Post
                    <Button className="float-right" onClick={()=>editState(true)}>Post New Job</Button>
                    </Card.Header>
                    <Card.Body>
                    <h5 className="text-center mb-2 text-primary">Posted by {profile.first_name} {profile.last_name}</h5>
                        <Table striped bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Post Title</th>
                                    <th>Description</th>
                                    <th>Salary</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{post.title}</td>
                                        <td>{post.description}</td>
                                        <td>{post.salary}</td>
                                        <td>{post.location}, {post.country}</td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {edit ? 
                            <AddPost show={edit} onHide={() => editState(false)}/>
                        : null }
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        token: state.auth.token,
        loading: state.post.loading,
        error: state.post.error,
        success: state.post.success,
        posts: state.post.items
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllPost)
