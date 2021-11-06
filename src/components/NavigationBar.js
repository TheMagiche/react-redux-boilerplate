import React, { Fragment } from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logoutAPI } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

const NavigationBar = (props) => {

    const { isAuthenticated } = props.auth;

    const handleLogout = () => {
        props.logout()
            .then((res) => {
                console.log(res);
                this.props.history.push('/login');
            }, (err) => {
                console.log(err.response);
            })
    }

    const GuestNav = () => (
        <Fragment>
            <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
            </LinkContainer>
        </Fragment>
    )

    const UserNav = () => (
        <NavDropdown title="Admin" id="basic-nav-dropdown">
            <LinkContainer to="/admin">
                <NavDropdown.Item>admin</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/admin">
                <NavDropdown.Item onClick={() => { handleLogout() }}>Logout</NavDropdown.Item>
            </LinkContainer>
        </NavDropdown>
    )





    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>React Authentication</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? <UserNav /> : <GuestNav/>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

const reduxState = (state) => ({
    auth: state.auth
});

const reduxDispatch = (dispatch) => ({
    logout: () => dispatch(logoutAPI())
})

export default withRouter(connect(reduxState, reduxDispatch)(NavigationBar));