import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Login extends Component {
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
        const { handleSubmit, title } = this.props;

        return (
            <div className="ui piled segment" style={{ margin: "15px" }}>
                <form onSubmit={handleSubmit(this.props.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                    <h3 style={{color:"purple", textAlign:"center"}}>{title}</h3>
                    <Field name="email" component={this.renderInput} label="Email : " type="text" />
                    <Field name="password" component={this.renderInput} type="password" label="Password : " />
                    <div className="ui error message">
                        {this.props.errorMessage}
                    </div>
                    <button className="ui primary button" action="submit">Log In</button>
                </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.email) {
        errors.email = 'Invalid email. Please try again!!';
    }

    if (!formValues.password) {
        errors.password = 'Invalid password. Please try again!!';
    }
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'login', validate })
)(Login);