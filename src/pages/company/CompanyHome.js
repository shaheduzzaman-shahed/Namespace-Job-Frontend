import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, } from 'react-router-dom'
import { Spinner, Alert, Card, Image, Button, Table } from 'react-bootstrap'
import { fetchApplications } from '../../store/actions/applicationAction'
import avatar from '../../assets/user.jpg'

function CompanyHome(props) {
    const [edit, editState] = useState(false)
    const { error, auth, loading, applications } = props;
    const profile = auth.profile
    // console.log(auth)
    useEffect(() => {
        props.fetchApplications(props.token)
    }, [])
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
                {error ? <Alert variant="danger">Error : {error.message}</Alert> : null}
                {error && error.errors ? <Alert variant="danger"> {Object.values(error.errors)}</Alert> : null}
                <Card border="success" className="mt-2">
                    <Card.Header as="h4">All Job Applications
                    <h5 className="float-right">{profile.first_name} {profile.last_name}</h5>
                    </Card.Header>
                    <Card.Body>
                    {applications.length > 0 ? 
                        <Table striped bordered hover size='sm'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Post Name</th>
                                    <th>Applicant Name</th>
                                    <th>Email</th>
                                    <th>Skills</th>
                                    <th>Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{app.post.title}</td>
                            
                                        <td>{app.applicant.first_name} {app.applicant.last_name}</td>
                                        <td>{app.applicant.email}</td>
                                        <td>{app.applicant.skills}</td>
                                        <td>
                                        <a href={app.applicant.resume} target="_blank" className="btn btn-primary">View Resume</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        : <div className="text-center mt-5"><h2>No Job Application Yet! </h2></div>
                    }
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
        loading: state.application.loading,
        error: state.application.error,
        applications: state.application.items
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchApplications: (token) => dispatch(fetchApplications(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome)
