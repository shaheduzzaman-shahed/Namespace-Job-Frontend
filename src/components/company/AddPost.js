import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import {connect} from 'react-redux'
import {addPost} from '../../store/actions/postAction'

function AddPost(props) {
    const profile = props.auth.profile
    const [state, setState] = useState({
       title : '',
       description : '',
       salary : '',
       location : '',
       country : '',
    })
    const handleChange = (e) => {
        let nState = {
            ...state,
            [e.target.id]: e.target.value
        }
        setState(nState)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)
        props.onHide()
        props.addPost(state, props.token);
    }
    return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Job Post
            </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form className="p-2" onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="Text" placeholder="enter job title" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="salary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" placeholder="enter post salary" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="location">
                    <Form.Label>Job Location</Form.Label>
                    <Form.Control type="Text" placeholder="enter job location" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="Text" placeholder="enter country" onChange={handleChange} />
                </Form.Group>
                
    
                <Button variant="primary" type="submit" size='md'>
                  Create Post
                </Button>
            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        token: state.auth.token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (data, token) => dispatch(addPost(data, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)