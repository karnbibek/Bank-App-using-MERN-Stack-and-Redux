import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from '../../authentication/requireAuth';

import LoansTable from '../reusableComponents/LoansTable';

class LoanDetails extends React.Component {
    componentDidMount() {
        if (!this.props.auth) {
            this.props.history.push('/');
        } else {
            this.props.userLoanDetails(this.props.auth.userId,this.props.auth.token,this.props.auth.role);
        }
    }

    renderLinks() {
        // console.log(this.props.auth.role);
        if (!this.props.auth) {
            this.props.history.push('/');
        }
        else if (this.props.auth.role !== "customer") {
            return (
                 <div className="ui warning message" style={{marginBottom: "20px"}}>
                    <div className="header danger">
                        Unauthorized Route!!
                    </div>
                </div>
            )
        }

        if (!this.props.state.auth.userLoans) {
            return (
                <div className="ui segment" style={{margin:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <LoansTable data={this.props.state.auth.userLoans} role={this.props.auth.role} />
                </div>
            );
        }
    }
    render() {
        return (
            <div style={{marginLeft: "5%", marginRight: '5%'}}>
                <h2 style={{textAlign:"center", background:"red", color: "white"}}>Loan History</h2>
                <div style={{ alignItems:"center" }}>{this.renderLinks()}</div>
            </div>
        );
    }
}
// var role = this.props.auth.role;
function mapStateToProps(state) {
    // console.log(state);
    // return { uid: state.auth.storedData.userId, loans: state.auth.userLoans };
    return { state };
}

export default connect(mapStateToProps, actions)(requireAuth(LoanDetails));