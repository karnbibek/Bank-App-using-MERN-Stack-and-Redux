import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import requireAuth from '../../authentication/requireAuth';
import * as actions from '../../actions';

class UpdateLoanStatus extends Component {
    
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

    onSubmit = formProps => {

        // console.log(formProps.status.toLowerCase());
        // console.log(formProps);
        this.props.updateLoanStatusByBanker(formProps.status.toLowerCase(), this.props.auth.token, this.props.location.user.uid.uid, this.props.location.user.lid.lid, () => {
            this.props.history.push('/banker');
        })
    }

    onCancel = () => {
        this.props.history.push('/banker');
    }

    renderLinks(handleSubmit) {
        if(this.props.role !== "banker") {
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
                        <div className="ui text">Please select a user to update the loan.</div>
                    </div>
                </div>
            );
            // this.props.history.push('/agent');
        }

        return (
            <div className="ui piled segment" style={{ marginTop: "25px", marginBottom: "25px" }}>
                <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                    <h2>Loan Amount : {this.props.location.user.amount.loanAmount}</h2>
                    <Field name="status" component={this.renderInput} label="Update Loan Status : " type="text" />
                    
                    {this.props.errorMessage ?
                    <div className="ui error message">
                        {this.props.errorMessage}
                    </div>
                    : ''
                    }
                    <button className="ui primary button" action="submit">Update Loan Status</button>
                    <button className="ui red button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        );
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div style={{marginLeft: "10%",marginRight:"10%"}}>
                    <h2 style={{textAlign:"center", background:"green", color: "white", }}>Update Loan Status</h2>
                {this.renderLinks(handleSubmit)}
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.status) {
        errors.status = 'Invalid status. Please try again!!';
    }
    if(formValues.status) {
        if (formValues.status.toLowerCase() !== "rejected" && formValues.status.toLowerCase() !== "approved") {
            errors.status = 'Invalid loan status. You can only select either Accepted or Rejected as loan status!!';
        }
    }
    return errors;
}

function mapStateToProps(state) {
    // console.log(state.auth.storedData.role);
    return { errorMessage: state.auth.errorMessage, role: state.auth.storedData.role };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'updateLoanStatus', validate })
)(requireAuth(UpdateLoanStatus));