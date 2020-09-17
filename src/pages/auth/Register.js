import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom'
import { Spinner, Alert, Form, Button } from 'react-bootstrap'

function Login(props) {
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        is_company: '',
        business_name: '',
        email: '',
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
        console.log(state)
        props.signup(state);
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
            <Form className="p-2" onSubmit={handleSubmit}>
                <h2 className="text-center">SignUP</h2><hr/>

                <Form.Group controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="Text" placeholder="enter your first name" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="Text" placeholder="enter your last name" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="is_company">
                    <Form.Label>Select a Role for Registration</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={null}
                      name="feature"
                      onChange={handleChange}
                    >
                      <option>Choose...</option>
                      <option value={0}>As User</option>
                      <option value={1}>As Company</option>
                    </Form.Control>
                  </Form.Group>

                {state.is_company === '1' ?
                <div>
                <Form.Group controlId="business_name">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control type="Text" placeholder="enter your business name" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="email">
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
                </div>
                : null
                }
                {state.is_company === '0' ?
                <div>
                <Form.Group controlId="email">
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
                </div>     
                : null   
                }
                
                <Button variant="primary" type="submit" size='md'>
                  SignUp  {loading ? <Spinner animation="border" variant="" size='sm' /> : null }
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
        signup: (credentials) => dispatch(signup(credentials)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
