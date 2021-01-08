import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import requireAuth from '../../authentication/requireAuth';
import * as actions from '../../actions';

class UpdateLoan extends Component {
    
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

        // console.log(this.props);
        // console.log(formProps);
        this.props.editLoanAmountByAgent(formProps.amount, this.props.auth.token, this.props.location.user.uid.uid, this.props.location.user.lid.lid, () => {
            this.props.history.push('/agent');
        })
    }

    onCancel = () => {
        this.props.history.push('/agent');
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
                        <div className="ui text">Please select a user to update the loan.</div>
                    </div>
                </div>
            );
            // this.props.history.push('/agent');
        }

        return (
            <div className="ui piled segment" style={{ marginTop: "25px", marginBottom: "25px" }}>
                    {this.props.auth.role === "agent" ? 
                    <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                        <Field name="amount" component={this.renderInput} label="Enter the updated loan amount : " type="text" />
                        {this.props.errorMessage ?
                        <div className="ui error message">
                            {this.props.errorMessage}
                        </div>
                        : ''
                        }
                        <button className="ui primary button" action="submit">Update Loan Amount</button>
                        <button className="ui red button" onClick={this.onCancel}>Cancel</button>
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
                    <h2 style={{textAlign:"center", background:"green", color: "white", }}>Update Loan</h2>
                {this.renderLinks(handleSubmit)}
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.amount || isNaN(formValues.amount) ) {
        errors.amount = 'Invalid amount. Please try again!!';
    }
    if (formValues.amount <= 100) {
        errors.amount = 'Please enter valid amount greater than Rs.100';
    }

    return errors;
}

function mapStateToProps(state) {
    // console.log(state);
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'updateLoan', validate })
)(requireAuth(UpdateLoan));