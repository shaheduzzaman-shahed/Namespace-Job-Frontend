import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav, Spinner, NavDropdown } from 'react-bootstrap'
import {connect} from 'react-redux'
import {getUser, signout} from '../store/actions/authAction'

function NavBar(props) {
    const {auth} = props
    useEffect(() => {
        if(auth.token && !auth.isLoggedIn ){
            props.getUser(auth.token)
        }
    }, [])
    const handleLogOut = () => {
        props.signout(auth.token)
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand as={Link} to="/">Namespace-Job</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                {auth.isLoggedIn ? 
                    <Nav className="ml-auto">
                       {auth.profile.is_company ? 
                        <Nav.Link as={Link} to="/companyHome">Home</Nav.Link>
                       : <Nav.Link as={Link} to="/userHome">Home</Nav.Link>
                       }
                        <NavDropdown title={auth.profile.first_name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogOut}>
                            SignOut 
                            </NavDropdown.Item>  
                        </NavDropdown>
                        <Nav.Link>
                        {auth.loading ? <Spinner animation="border" variant="primary" size='sm' /> : null }
                        </Nav.Link>
                    </Nav>
                :
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login">SingIn</Nav.Link>
                        <Nav.Link as={Link} to="/register">SignUp</Nav.Link>                   
                    </Nav>
                } 
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        loading: state.auth.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser : (token) => dispatch(getUser(token)),
        signout : (token) => dispatch(signout(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)