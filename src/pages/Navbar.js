import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavbarItems from '../components/reusableComponents/NavbarItems';

class Navbar extends React.Component {
    renderLinks() {
        // console.log(this.props);
        if (this.props.authenticated){
            if (this.props.authenticated.role === "customer") {
                return(
                    <div className="menu">
                        <NavbarItems destination="customer" displayText="Transactions" />
                        <NavbarItems destination="customer/deposit" displayText="Deposit" />
                        <NavbarItems destination="customer/withdraw" displayText="Withdraw" />
                        <NavbarItems destination="customer/loan-details" displayText="Loan Details" />
                        <NavbarItems destination="signout" displayText="Signout" />
                    </div>
                )
            } else if (this.props.authenticated.role === "agent") {
                return (
                    <div className="right menu">
                        <NavbarItems destination="agent" displayText="All Users" />
                        <NavbarItems destination="signout" displayText="Signout" />
                    </div>
                )
            } else if (this.props.authenticated.role === "banker") {
                return (
                    <div className="right menu">
                        <div className="ui simple dropdown item" value="">
                        Register <i className="dropdown icon" />
                            <div className="menu">
                                <Link to="/banker/register-agent" className="item">Register New Agent</Link>
                                <Link to="/banker/register-banker" className="item">Register New Banker</Link>
                                <Link to="/banker/register-customer" className="item">Register New Customer</Link>
                            </div>
                        </div>
                        <NavbarItems destination="banker" displayText="Banker Details" />
                        <NavbarItems destination="signout" displayText="Signout" />
                    </div>
                )
            } else {
                return (
                    <div className="right menu">
                        <NavbarItems destination="" displayText="Invalid User" />
                        <NavbarItems destination="signout" displayText="Signout" />
                    </div>
                )
            }
        }
        else {
            return(
                <div className="right menu">
                    <div className="ui item">
                        <Link to="/agent-login">
                            <div className="ui inverted primary button">
                                Agent Login
                            </div>
                        </Link>
                        </div>
                    <div className="ui item">
                        <Link to="/banker-login">
                            <div className="ui inverted primary button">
                                Banker Login
                            </div>
                        </Link>
                    </div>
                    <div className="ui item">
                        <Link to="/customer-login">
                            <div className="ui inverted primary button">
                                Customer Login
                            </div>
                        </Link>
                    </div>
                    
                </div>
            )
        }
    }

    render() {
        // console.log(this.props)
        return (
            <div>
            <div className="ui secondary menu">
                <div className="active item">
                    <Link to="/" style={{textAlign:"center"}}>React Bank</Link>
                </div>
                {this.renderLinks()}
            </div>
                {this.props.authenticated ? <h3 style={{textAlign:"right", color: "blue", margin: "0 8px 0 0"}}>Signed in as : {this.props.authenticated.email}</h3> : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return { authenticated: state.auth.storedData }
}

export default connect(mapStateToProps)(Navbar);