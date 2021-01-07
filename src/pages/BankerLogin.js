import React from 'react';
import LoginForm from '../components/reusableComponents/LoginForm';
import * as actions from '../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

class CustomerLogin extends React.Component {
    onSubmit = formProps => {
        this.props.signin( 'login-banker', formProps, () => {
            this.props.history.push('/banker');
        })
    }

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit} title="Banker Login Page" />
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions)
)(CustomerLogin);