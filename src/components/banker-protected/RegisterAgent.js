import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import requireAuth from '../../authentication/requireAuth';
import SignupForm from '../../components/reusableComponents/Signup';

class RegisterAgent extends React.Component {
    onSubmit = formProps => {
        console.log(this.props);
        this.props.register('register-agent', this.props.token, formProps, () => {
            this.props.history.push('/banker');
        })
    }
    onCancel = () => {
        console.log(this.props.token);
        this.props.history.push('/banker');
    }

    render() {
        return (
            <SignupForm onSubmit={this.onSubmit} userType="Agent" onCancel={this.onCancel} />
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage, token: state.auth.storedData.token };
}

export default compose(
    connect(mapStateToProps, actions)
)(requireAuth(RegisterAgent));