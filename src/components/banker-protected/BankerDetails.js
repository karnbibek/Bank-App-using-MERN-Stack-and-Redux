import React from 'react';
import { connect } from 'react-redux';
import requireAuth from '../../authentication/requireAuth';
import * as actions from '../../actions';

import AllAccountDetails from '../reusableComponents/AllAccountDetails';

class BankerDetails extends React.Component {
    componentDidMount() {
        if(!this.props.auth) {
            this.props.history.push('/');
        } else {
        this.props.allUsersAccountDetails(this.props.auth.token, "banker");
        }
    }
    
    renderLinks() {
        if (!this.props.auth) {
            // console.log(this.props);
            this.props.history.push('/');
            return (
                <div className="ui warning message" style={{marginBottom: "20px"}}>
                    <div className="header danger">
                        Unauthorized Route!!
                    </div>
                </div>
            );
        }
        if(this.props.auth.role !== "banker") {
            return (
                <div className="ui warning message" style={{marginBottom: "20px"}}>
                    <div className="header danger">
                        Unauthorized Route!!
                    </div>
                </div>
            );
        }

        if(!this.props.state.auth.allUserTransactions){
            return (
                <div className="ui segment" style={{marginBottom:"30px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
                </div>
            );
        } else {
            return(
                <AllAccountDetails data={this.props.state.auth.allUserTransactions} user="banker" />
            )
        }
    }
    
    render() {
        return (
            <div style={{alignItems:"center", justifyContent:"center"}}>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {state};
}

export default connect(mapStateToProps, actions)(requireAuth(BankerDetails));