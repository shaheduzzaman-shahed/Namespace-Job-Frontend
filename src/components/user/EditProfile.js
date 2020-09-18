import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateProfile} from '../../store/actions/authAction'

function EditProfile(props) {
    const profile = props.auth.profile
    const [state, setState] = useState({
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        is_company: profile.is_company,
        business_name: profile.business_name,
        email: profile.email,
        image : profile.image,
        resume : profile.resume,
        skills : profile.skills,
    })
    const handleChange = (e) => {
        let nState = {
            ...state,
            [e.target.id]: e.target.value
        }
        setState(nState)
    }
    const imageHandler = (e) =>{
        setState({...state, [e.target.id]: e.target.files });
      }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)
        props.onHide()
        props.updateProfile(state, props.token);
    }
    return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
            </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form className="p-2" onSubmit={handleSubmit}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="Text" placeholder="enter your first name" onChange={handleChange} value={state.first_name} />
                </Form.Group>
                <Form.Group controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="Text" placeholder="enter your last name" onChange={handleChange} value={state.last_name}/>
                </Form.Group>
                <Form.Group>
                        <Form.File 
                          id="image"
                          label="upload profile image"
                          custom
                          onChange={imageHandler}
                        />
                </Form.Group>
                {state.is_company == 0 ?
                <div>
                   <Form.Group>
                        <Form.File 
                          id="resume"
                          label="upload your updated Resume"
                          custom
                          onChange={imageHandler}
                        />
                    </Form.Group>
                <Form.Group controlId="skills">
                    <Form.Label>Your Skills</Form.Label>
                    <Form.Control as="textarea" rows={3} value={state.skills} onChange={handleChange}/>
                </Form.Group>
                {/* <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={state.email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group> */}
                {/* <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                </Form.Group> */}
                </div>     
                : null   
                }
                {state.is_company == 1 ?
                <div>
                <Form.Group controlId="business_name">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control type="Text" placeholder="enter your business name" onChange={handleChange} value={state.business_name}/>
                </Form.Group>
                </div>
                : null
                }

                <Button variant="primary" type="submit" size='md'>
                  Update
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
        loading: state.auth.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (data, token) => dispatch(updateProfile(data, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)