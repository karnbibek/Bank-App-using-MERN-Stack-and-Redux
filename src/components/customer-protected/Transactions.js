import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from '../../authentication/requireAuth';

import TransactionsTable from '../reusableComponents/TransactionsTable';

class CustomerLogin extends React.Component {
    componentDidMount() {
        // console.log(this.props);
        if (!this.props.auth) {
            this.props.history.push('/');
        }
        else {
            this.props.userTransactions(this.props.auth.userId,this.props.auth.token);
            this.props.userBalance(this.props.auth.userId,this.props.auth.token);
        }
    }

    renderLinks() {
        // console.log(this.props.auth.role);
        if (!this.props.auth) {
            this.props.history.push('/');
        }
        else if(this.props.auth.role !== "customer") {
            return (
                 <div className="ui warning message" style={{marginBottom: "20px"}}>
                    <div className="header danger">
                        Unauthorized Route!!
                    </div>
                </div>
            )
        }

        if (!this.props.state.auth.userTransactions) {
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <TransactionsTable data={this.props.state.auth.userTransactions} balance={this.props.balance} />
                </div>
            );
        }
    }
    render() {
        return (
            <div style={{marginLeft: "5%", marginRight: '5%'}}>
                <h2 style={{textAlign:"center", background:"purple", color: "white"}}>Transaction History</h2>
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