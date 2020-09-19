import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, } from 'react-router-dom'
import { Spinner, Alert, Card, Modal, Button, Table } from 'react-bootstrap'
import { fetchPosts, deletePost } from '../../store/actions/postAction'
import AddPost from '../../components/company/AddPost'

function AllPost(props) {
    const [edit, editState] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState({detete:false, id:null})
    const { error, auth, loading, posts, success } = props;
    const profile = auth.profile
    // console.log(auth)
    useEffect(() => {
        if(posts.length < 1){
            props.fetchPosts(props.token)
        }
    }, [])

    const handleClose = () => setConfirmDelete(false)
    const handleDelete = () => {
        handleClose()
        props.deletePost(confirmDelete.id, props.token)
      }
    if (auth.isLoggedIn) {
        if (!auth.profile.is_company) {
            return <Redirect to="/userHome" />
        }
    }else{
        return <Redirect to="/" />
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
                    {posts.length > 0 &&
                    <h5 className="text-center mb-2 text-primary">Posted by {profile.first_name} {profile.last_name}</h5>
                    }
                    {posts.length > 0 ? 
                        <Table striped bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Post Title</th>
                                    <th>Description</th>
                                    <th>Salary</th>
                                    <th>Location</th>
                                    <th>Action</th>
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
                                        <td>
                                          <Button size="sm" variant="danger" onClick={() => setConfirmDelete({delete:true, id:post.id})}>Delete</Button>
                                        </td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        : <div className="text-center mt-5">
                            <h2>You didn't posted any job Yet! </h2><br/>
                            <Button className="" onClick={()=>editState(true)}>Post Now</Button>
                        </div>
                    }
                        {edit ? 
                            <AddPost show={edit} onHide={() => editState(false)}/>
                        : null }
                        <Modal show={confirmDelete.delete} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5> Are you sure you want to Delete? </h5>    
                                <p className="input-field-specification">
                                    Warning: Deleting Post will also Remove
                                    all the Applications for this post!
                                </p>         
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    No
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Yes
                                </Button>
                                </Modal.Footer>
                        </Modal>
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
        deletePost: (id, token) => dispatch(deletePost(id, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllPost)
