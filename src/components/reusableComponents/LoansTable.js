import React from 'react';
import { Link } from 'react-router-dom';

class LoansTable extends React.Component {
    renderLoanStatus(data) {
        if (data.loanStatus) {
            if (data.loanStatus === "new") {
                return <div className="ui primary button">New</div>;
            } else if (data.loanStatus === "rejected") {
                return <div className="ui red button">Rejected</div>;
            } else if (data.loanStatus === "approved") {
                return <div className="ui green button">Approved</div>;
            } else {
                return <div>Invalid status</div>;
            }
        }
    }

    updateLoan(data) {
        const uid = data.creator;
        const lid = data.id;
        // console.log(data);
        if (data.loanStatus === "new") {
            return <Link to={{pathname:"/agent/customer/update-loan", user:{uid:{uid}, lid: {lid}}}}><div className="ui green button">Update Details</div></Link>;
        } else if (data.loanStatus === "rejected") {
            return <div className="ui disabled button">Update Details</div>;
        } else if (data.loanStatus === "approved") {
            return <div className="ui disabled button">Update Details</div>;
        } else {
            return <div>Update Details</div>;
        }
    }

    updateLoanStatus(data) {
        const uid = data.creator;
        const lid = data.id;
        const email = data.email;
        const loanAmount = data.loanAmount;
        if (data.loanStatus === "new") {
            return <Link 
                to={{pathname:"/banker/customer/update-loan-status", user:{uid:{uid}, lid: {lid}, email:{email}, amount: {loanAmount}}}}>
                    <div className="ui green button">Update Details</div>
                </Link>;
        } else if (data.loanStatus === "rejected") {
            return <div className="ui disabled button">Update Details</div>;
        } else if (data.loanStatus === "approved") {
            return <div className="ui disabled button">Update Details</div>;
        } else {
            return <div>Update Details</div>;
        }
    }

    render() {
        const { data, role, email } = this.props;

        return (
            <div>
                <table className="ui selectable celled table unstackable" style={{marginBottom:"30px"}}>
                    <thead>
                        <tr>
                            <th style={{width: "5%"}}>S.N.</th>
                            <th style={{width: "15%"}}>Loan Amount</th>
                            <th style={{width: "15%"}}>Duration</th>
                            <th style={{width: "10%"}}>Interest Rate</th>
                            <th style={{width: "15%"}}>Status</th>
                            <th style={{width: "20%"}}>Date</th>
                            {role === "agent" ? <th style={{width: "20%"}}>Update Loan Request</th> 
                            : null}
                            {role === "banker" ? <th style={{width: "20%"}}>Update Loan Status</th> 
                            : null}
                        </tr>
                    </thead>
                    {data.map((data,index)=> 
                    <tbody key={data.id}>
                        <tr>
                        <td>{index+1}</td>
                        <td>{data.loanAmount}</td> 
                        <td>{data.duration} Months</td>
                        {/* <td>{data.amount}</td>  */}
                        <td>{data.rateOfInterest} %</td>
                        <td>{this.renderLoanStatus(data)}</td>
                        <td>{data.date}</td>
                        {role === "agent" ? <td>{this.updateLoan(data)}</td> 
                        : null}
                        {role === "banker" ? <td>{this.updateLoanStatus(data)}</td> 
                        : null}
                        </tr>
                    </tbody>
                    )}
                    
                </table>
            </div>
        );
    }
}

export default LoansTable;