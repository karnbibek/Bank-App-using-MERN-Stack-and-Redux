import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from '../../authentication/requireAuth';

import TransactionsTable from '../reusableComponents/TransactionsTable';

class CustomerLogin extends React.Component {
    componentDidMount() {
        if (this.props.location.user) {
            this.props.userTransactionsByAgent(this.props.location.user.uid.id,this.props.auth.token,this.props.auth.role);
        }
    }

    renderLinks() {
        if (this.props.history.location.user) {
            if(this.props.auth.role !== this.props.history.location.user.user.user || this.props.auth.role === "customer") {
                return (
                    <div className="ui warning message" style={{marginBottom: "20px"}}>
                        <div className="header danger">
                            Unauthorized Route!!
                        </div>
                    </div>
                )
            }
        }
        if (!this.props.state.auth.userTransactions) {
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text">Loading...</div>
                    </div>
                </div>
            );
            // this.props.history.push('/agent');
        }
        else if (this.props.state.auth.userTransactions.length === 0) {
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text">Transactions not found for the provided user. Please select a user to see the details.</div>
                    </div>
                </div>
            );
            // this.props.history.push('/agent');
        } else {
            return (
                <div>
                    <TransactionsTable data={this.props.state.auth.userTransactions} balance={this.props.location.user.balance.balance} />
                </div>
            );
        }
    }
    render() {
        // console.log(this.props.location.user.balance.balance);
        return (
            <div style={{marginLeft: "5%", marginRight: '5%'}}>
                {/* <h2 style={{textAlign:"center", background:"purple", color: "white"}}>Transaction History</h2> */}
                {/* {this.props ? <h2 style={{textAlign:"center", background:"purple", color: "white"}}>Transaction History of {this.props.auth.email}</h2> : null} */}
                {this.props.history.location.user ? <h2 style={{textAlign:"center", background:"purple", color: "white"}}>Transaction History of {this.props.history.location.user.email.email}</h2> : null}

                <div style={{ alignItems:"center"}}>{this.renderLinks()}</div>
            </div>
        );
    }
}
// var role = this.props.auth.role;
function mapStateToProps(state) {
    // console.log(state);
    // return { uid: state.auth.storedData.userId, transactions: state.auth.userTransactions, balance: state.auth.balance };
    return { state };
}
export default connect(mapStateToProps, actions)(requireAuth(CustomerLogin));