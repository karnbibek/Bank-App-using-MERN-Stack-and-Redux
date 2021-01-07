import React from 'react';
import LoginForm from '../components/reusableComponents/LoginForm';
import * as actions from '../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

class AgentLogin extends React.Component {
    onSubmit = formProps => {
        this.props.signin( 'login-agent', formProps, () => {
            this.props.history.push('/agent');
        })
    }

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit} title="Agent Login Page" />
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions)
)(AgentLogin);