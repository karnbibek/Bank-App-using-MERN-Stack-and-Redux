import React from 'react';
import LoginForm from '../components/reusableComponents/LoginForm';
import * as actions from '../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

class CustomerLogin extends React.Component {
    onSubmit = formProps => {
        this.props.signin( 'login-customer', formProps, () => {
            this.props.history.push('/customer');
            // console.log(this.props);
        })
    }

    render() {
        return (
            <div>
                
                <LoginForm onSubmit={this.onSubmit} title="Customer Login Page" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions)
    // reduxForm({ form: 'signin', validate })
)(CustomerLogin);
// export default CustomerLogin;