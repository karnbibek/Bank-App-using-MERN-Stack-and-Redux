import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import requireAuth from '../../authentication/requireAuth';
import * as actions from '../../actions';

class LoanRequest extends Component {
    
    renderError({ error, touched }) {
        if (touched && error) {
            // console.log(error);
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

    onCancel = () => {
        this.props.history.push('/agent');
    }

    onSubmit = formProps => {

        // console.log(this.props);
        // console.log(formProps);
        this.props.requestLoanByAgent(formProps.loanAmount, formProps.duration, formProps.rateOfInterest, this.props.location.user.uid.id, this.props.auth.token, () => {
            this.props.history.push('/agent');
        })
    }

    renderLinks(handleSubmit) {
        if (!this.props.auth) {
            this.props.history.push('/');
        } 
        else if(this.props.auth.role !== "agent") {
            return (
                 <div className="ui warning message" style={{marginBottom: "20px"}}>
                    <div className="header danger">
                        Unauthorized Route!!
                    </div>
                </div>
            )
        }
        // console.log(this.props);
        if (!this.props.location.user) {
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text">Please select a user to request loan on their behalf.</div>
                    </div>
                </div>
            );
            // this.props.history.push('/agent');
        }

        return (
            <div className="ui raised segments" style={{ margin: "25px" }}>
                    {this.props.auth.role === "agent" ? 
                    <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error" style={{ margin:"20px"}}>
                        <Field name="loanAmount" component={this.renderInput} label="Loan Amount (Rs.) : " type="text" />
                        <Field name="duration" component={this.renderInput} label="Duration (months) : " type="text" />
                        <Field name="rateOfInterest" component={this.renderInput} label="Rate of Interest (% per annum): " type="text" />
                        {this.props.errorMessage ?
                        <div className="ui error message">
                            {this.props.errorMessage}  
                        </div>
                        : ''
                        }
                        <div style={{textAlign:"center"}}>
                        <button style={{ marginRight:"15px"}} className="ui primary button" action="submit">Submit Loan Request</button>
                        <button style={{ marginTop:"7px"}} className="ui red button" onClick={this.onCancel} >Cancel</button>
                        </div>
                    </form>
                    : 
                    <div className="ui warning message" style={{marginBottom: "20px"}}>
                        <div className="header danger">
                            Unauthorized Route!!
                        </div>
                    </div>
                    }
                </div>
        );
    }
    
    render() {
        // console.log(this.props)
        const { handleSubmit } = this.props;
        return (
            <div style={{marginLeft: "10%",marginRight:"10%"}}>
                    <h2 style={{textAlign:"center", background:"green", color: "white", }}>Request Loan</h2>
                {this.renderLinks(handleSubmit)}
            </div>
        );
    }
}

const validate = formValues => {
    // console.log(formValues);
    const errors = {};
    if (!formValues.loanAmount || isNaN(formValues.loanAmount) ) {
        errors.loanAmount = 'Invalid amount. Please try again!!';
    }
    if (!formValues.duration) {
        errors.duration = 'Please enter valid duration for the loan';
    }
    if (!formValues.rateOfInterest) {
        errors.rateOfInterest = 'Please enter valid rate of interest for the loan';
    }
    // console.log(errors);
    return errors;
}

function mapStateToProps(state) {
    // console.log(state);
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'requestLoanByAgent', validate })
)(requireAuth(LoanRequest));