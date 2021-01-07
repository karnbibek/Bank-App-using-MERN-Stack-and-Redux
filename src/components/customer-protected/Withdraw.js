import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import requireAuth from '../../authentication/requireAuth';
import * as actions from '../../actions';

class Withdraw extends Component {
    
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
        console.log(formProps.amount);
        this.props.withdrawMoney(formProps.amount,this.props.auth.token, () => {
            this.props.history.push('/customer');
            // console.log(this.props);
        })
    }

    onCancel = () => {
        this.props.history.push('/customer');
    }

    render() {
        const { handleSubmit } = this.props;
        return (
                <div style={{ marginLeft:"10%", marginRight: "10%"}}>
                    <h2 style={{textAlign:"center", background:"red", color: "white"}}>Withdraw Money</h2>
                    <div className="ui piled segment" style={{ marginTop: "25px", marginBottom:"25px" }}>
                        {this.props.auth.role === "customer" ? 
                        <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                            <Field name="amount" component={this.renderInput} label="Enter the amount to withdraw : " type="text" />
                            {this.props.errorMessage ?
                            <div className="ui error message">
                                {this.props.errorMessage}  
                            </div>
                            : ''
                            }
                            <button className="ui primary button" action="submit">Withdraw</button>
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
                </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.amount || isNaN(formValues.amount)) {
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
    reduxForm({ form: 'withdrawMoney', validate })
)(requireAuth(Withdraw));