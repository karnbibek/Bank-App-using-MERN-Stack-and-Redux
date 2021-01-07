import React from 'react';
import * as actions from '../../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SignupForm from '../../components/reusableComponents/Signup';
import requireAuth from '../../authentication/requireAuth';

class RegisterCustomer extends React.Component {
    onSubmit = formProps => {
        this.props.register('register-customer', this.props.token, formProps, () => {
            this.props.history.push('/banker');
        })
    }
    onCancel = () => {
        this.props.history.push('/banker');
    }

    render() {
        return (
            <SignupForm onSubmit={this.onSubmit} userType="Customer" onCancel={this.onCancel} />
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage, token: state.auth.storedData.token };
}

export default compose(
    connect(mapStateToProps, actions)
)(requireAuth(RegisterCustomer));