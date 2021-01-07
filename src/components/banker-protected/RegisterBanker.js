import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import requireAuth from '../../authentication/requireAuth';
import SignupForm from '../../components/reusableComponents/Signup';

class RegisterBanker extends React.Component {
    onSubmit = formProps => {
        this.props.register('register-banker', this.props.token, formProps, () => {
            this.props.history.push('/banker');
        })
    }
    onCancel = () => {
        this.props.history.push('/banker');
    }

    render() {
        return (
            <SignupForm onSubmit={this.onSubmit} userType="Banker" onCancel={this.onCancel} />
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage, token: state.auth.storedData.token };
}

export default compose(
    connect(mapStateToProps, actions)
)(requireAuth(RegisterBanker));