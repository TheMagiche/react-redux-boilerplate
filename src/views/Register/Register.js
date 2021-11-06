import React, { Fragment } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm'
import { registerAPI } from '../../actions/authActions'

const Register = (props) => {

    const handleSubmit = (data) => {
        console.log(data)

        return props.register(data)
            .then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err.response);
                // async validation / validation to the server when an error occurs on the server     
                throw new SubmissionError({
                    _error: 'Email has been used'
                })
            })

    }

    const { message } = props.message


    return (
        <Fragment>
            <Container className="mt-5">

                <Row>
                    <Col md={6} className="mx-auto">

                        <h2>Register</h2>
                        {message && <div className="alert alert-success">{message}</div>}
                        <hr />

                        <RegisterForm onSubmit={() => handleSubmit()} />

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
    register: (data) => dispatch(registerAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);