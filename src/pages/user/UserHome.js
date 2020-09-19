import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, } from 'react-router-dom'
import { Spinner, Alert, Card, Image, Button } from 'react-bootstrap'
import avatar from '../../assets/user.jpg'
import EditProfile from '../../components/user/EditProfile'

function UserHome(props) {
    const [edit, editState] = useState(false)
    const { error, auth, loading } = props;
    const profile = auth.profile
    // console.log(auth)
    if (auth.isLoggedIn) {
        if (auth.profile.is_company) {
            return <Redirect to="/companyHome" />
        }
    }else{
        return <Redirect to="/" />
    }
    if (loading) {
        return (<h3 className="text-center mt-5">loading... <Spinner animation="grow" variant="primary" /></h3>)
    } else {
        return (


            <div className="col-md-6 m-auto">
                {props.location.state ? 
                    <Alert variant="danger">  {props.location.state.resumeWarning} <a href="#" onClick={()=>editState(true)}>Upload Now</a></Alert>
                : null }
                {error ? <Alert variant="danger">Error : {error.message}</Alert> : null}
                {error && error.errors ?<Alert variant="danger"> {Object.values(error.errors)}</Alert> : null}
                <Card border="success" className="mt-2">
                    <Card.Header as="h4">Profile
                    <Button className="float-right" onClick={()=>editState(true)}>Edit Profile</Button>
                    </Card.Header>
                    <Image src={profile.image ? profile.image : avatar} className="ml-4 mt-4" rounded height="150" width="150"/>
                    <h4 className="ml-4 mt-4">{profile.first_name} {profile.last_name}</h4>
                    <Card.Body>
                    <p><span className="font-weight-bold">Email : </span>{profile.email}</p>
                    <p><span className="font-weight-bold">Skills : </span>{profile.skills}</p>
                    {profile.resume ? 
                    <div>
                        <h5 className="mb-2">Resume : </h5>
                        <embed src={profile.resume} width="560px" height="370px" />
                        <a href={profile.resume} target="_blank" className="btn btn-primary mt-3 float-right">View on Browser</a>
                    </div>
                    :
                    <Alert variant="danger">You Didn't Upload Your Resume Yet! please <a href="#" onClick={()=>editState(true)}>Upload</a></Alert>
                    }
                    </Card.Body>
                </Card>
                {edit ? 
                    <EditProfile show={edit} onHide={() => editState(false)}/>
                : null }
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        loading: state.auth.loading,
        error: state.auth.error,
    };
};

export default connect(mapStateToProps, null)(UserHome)
