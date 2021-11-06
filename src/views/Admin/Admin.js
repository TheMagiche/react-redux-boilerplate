import React, { Fragment, useEffect } from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { logoutAPI, getProtectedAPI } from '../../actions/authActions';
import { connect } from 'react-redux';

const Admin = (props) => {
    const { getProtected } = props;
    useEffect(() => {
        getProtected()
            .then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err.response);
            })
    }, [getProtected])


    const handleLogout = () => {
        this.props.logout()
            .then((res) => {
                console.log(res);
                this.props.history.push('/login');
            }, (err) => {
                console.log(err.response);
            })
    }

    const { message } = props.message;

    return (
        <Fragment>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <p>Admin Dashboard</p>
                        <hr />
                        <p>{message}</p>
                        <Button onClick={() => handleLogout()}>Logout</Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );


}

const reduxState = (state) => ({
    message: state.auth
})

const reduxDispatch = (dispatch) => ({
    logout: () => dispatch(logoutAPI()),
    getProtected: () => dispatch(getProtectedAPI())
})

export default connect(reduxState, reduxDispatch)(Admin);