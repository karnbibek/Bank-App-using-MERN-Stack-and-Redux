import React from 'react';
import { Link } from 'react-router-dom';

class AllAccountDetails extends React.Component {
    renderCard(data,index, user) {
        if (data === '') {return null;}
        else {
            var id = data.id;
            var role = data.role;
            var balance = data.balance;
            var email = data.email;
            return (
                <div className="ui centered stackable three column grid" key={index}>
                    <div className="column">
                <div className="ui centered card" style={{marginBottom:"20px"}}>
                    <div className="content">
                        <div className="header">Name. {data.name}</div>
                    </div>
                    <div className="content">
                        <h4 className="ui header"> Email : {data.email}</h4>                        
                    </div>
                    <div className="content">
                        <h4 className="ui header"> Balance : {data.balance}</h4>
                    </div>
                    <div className="content">
                        <h4 className="ui header"> Account Created on : {data.date}</h4>
                    </div>
                    {user === "agent" ? <div className="content">
                        <Link to={{
                            pathname:`/${user}/customer/request-loan`,
                            user: {
                                uid: {id},
                                email: {email}
                            }
                        }} className="ui purple button"> Request Loan</Link>
                        
                    </div> : null}
                    <div className="content">
                        <Link to={{
                            pathname:`/${user}/customer/loan-details`,
                            user: {
                                uid: {id},
                                role: {role},
                                user: {user},
                                email: {email}
                            }
                        }} className="ui red button"> View Loan History</Link>
                    </div>
                    <div className="content">
                        <Link to={{
                            pathname:`/${user}/customerDetails`,
                            user: {
                                uid: {id},
                                balance: {balance},
                                user: {user},
                                email: {email}
                            }
                        }} className="ui green button">View Account History</Link>
                    </div>
                </div>
                </div>
                </div>
            );
        }
    }

    render() {
        const { data, user } = this.props;
        // console.log(data);
        return (
            <div>
            {data.map((data,index) =>
                this.renderCard(data,index,user)
            )}
            </div>
        );
    }
}

export default AllAccountDetails;