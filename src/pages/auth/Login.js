import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signin } from '../../store/actions/authAction'
import { Redirect, Link } from 'react-router-dom'
import { Spinner, Alert, Form, Button } from 'react-bootstrap'

function Login(props) {
    const [state, setState] = useState({
        username: '',
        password: ''
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
        // console.log(state)
        props.signin(state);
    }
    const { loginError, auth, loading } = props;
    // console.log(loginError)
    if (auth.isLoggedIn) {
        return <Redirect to="/userHome" />
    }



    return (
        <div className="col-md-6 m-auto border">
            <div className="text-center mt-2">
                {loginError ? <Alert variant="danger">Error : {loginError}</Alert> : null}
            </div>
            <Form className="mt-2 p-3" onSubmit={handleSubmit}>
                <h2 className="text-center">SignIn</h2><hr/>

                <Form.Group controlId="username">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                </Form.Group>
                
                <Button variant="primary" type="submit" size='md'>
                  Login  {loading ? <Spinner animation="border" variant="" size='sm' /> : null }
                </Button>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loginError: state.auth.error,
        auth: state.auth,
        loading: state.auth.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signin: (credentials) => dispatch(signin(credentials)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
