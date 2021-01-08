import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta, type }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="on" className="ui input focus" type={type} />
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        const { handleSubmit, userType, onCancel } = this.props;

        return (
            <div className="ui red piled segment" style={{ margin: "15px" }}>
                <h2 className="ui center aligned icon header purple">
                    Register New {userType ? userType : "User"}
                </h2>
                <form onSubmit={handleSubmit(this.props.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                    <Field name="name" component={this.renderInput} type="text" label="Name : " />
                    <Field name="email" component={this.renderInput} type="email" label="Email : " />
                    {userType === "Customer" ? <Field name="balance" component={this.renderInput} label="Starting Balance : " type="text" /> : null}
                    {userType === "Customer" ? 
                        <Field name="accountType" component={this.renderInput} type="text" label="Account Type : " />
                    : null}
                    <Field name="password" component={this.renderInput} type="password" label="Password : " />
                    <Field name="confirmPassword" component={this.renderInput} type="password" label="Confirm Password : " />
                    <button className="ui primary button" action="submit">Register</button>
                    <button className="ui red button" onClick={onCancel}>Cancel</button>
                    <div className="ui error message">
                        {this.props.errorMessage}
                    </div>
                </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Invalid name. Please try again!!';
    }
    if (!formValues.email) {
        errors.email = 'Invalid email. Please try again!!';
    }
    if (!formValues.balance) {
        errors.balance = 'Invalid balance. Please try again!!';
    }
    if (!formValues.accountType) {
        errors.accountType = 'Invalid account type!! Please enter a valid account type.';
    }

    if (!formValues.password) {
        errors.password = 'Invalid password!! Please enter a valid password.';
    }
    if (formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = 'Please enter same password as entered above!!';
    }
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'register', validate })
)(Signup);