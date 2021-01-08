import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from '../../authentication/requireAuth';

import LoansTable from '../reusableComponents/LoansTable';

class UserLoanDetails extends React.Component {
    componentDidMount() {
        if (this.props.location.user) {
            // console.log(this.props);
            this.props.userLoanDetails(this.props.location.user.uid.id,this.props.auth.token,this.props.auth.role);
        }
    }

    renderLinks() {
        // console.log(this.props.auth.role);
        if (this.props.history.location.user) {
        if(this.props.auth.role !== this.props.history.location.user.user.user || this.props.auth.role === "customer") {
            return (
                 <div className="ui warning message" style={{marginBottom: "20px"}}>
                    <div className="header danger">
                        Unauthorized Route!!
                    </div>
                </div>
            )
        }}
        if (!this.props.state.auth.userLoans) {
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text">Loans not found for the provided user. Please select the user again to see the details.</div>
                    </div>
                </div>
            );
            // this.props.history.push('/agent');
        } else if (this.props.state.auth.userLoans.length === 0) {
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text">Loans not found for the provided user. Please select a user to see the details.</div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <LoansTable data={this.props.state.auth.userLoans} role={this.props.auth.role} email={this.props.auth.email} />
                </div>
            );
        }
    }
    render() {
        // console.log(this.props)
        return (
            <div style={{marginLeft: "5%", marginRight: '5%'}}>
                {this.props.history.location.user ? <h2 style={{textAlign:"center", background:"purple", color: "white"}}>Loan History of {this.props.history.location.user.email.email}</h2> : null}
                <div style={{ alignItems:"center"}}>{this.renderLinks()}</div>
            </div>
        );
    }
}
// var role = this.props.auth.role;
function mapStateToProps(state) {
    // return { uid: state.auth.storedData.userId, loans: state.auth.userLoans, balance: state.auth.balance };
    return { state };
}
export default connect(mapStateToProps, actions)(requireAuth(UserLoanDetails));