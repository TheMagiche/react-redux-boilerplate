import React, { Fragment } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form';
import { loginAPI } from '../../actions/authActions'
import LoginForm from './LoginForm';

const Login = (props) => {

    const handleSubmit = (data) => {
        console.log(data);
        return props.login(data)
            .then((res) => {
                console.log(res);
                props.history.push('/admin');
            }, (err) => {
                console.log(err.response);

                // async validation / validation to the server when an error occurs on the server
                throw new SubmissionError({
                    _error: 'Login failed! Email Or Password not correct'
                })
            })
    }

    return (
        <Fragment>
            <Container className="mt-5">

                <Row>
                    <Col md={6} className="mx-auto">

                        <h2>Login</h2>

                        <hr />

                        <LoginForm onSubmit={handleSubmit} />

                    </Col>
                </Row>

            </Container>
        </Fragment>
    );


}

const reduxDispatch = (dispatch) => ({
    login: (data) => dispatch(loginAPI(data))
});

export default connect(null, reduxDispatch)(Login);