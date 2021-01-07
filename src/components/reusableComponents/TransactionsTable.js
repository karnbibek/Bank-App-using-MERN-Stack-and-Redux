import React from 'react';

class TransactionsTable extends React.Component {
    render() {
        const { data, balance } = this.props;
        return (
            <div>
                <table className="ui selectable celled table unstackable" style={{marginBottom:"30px"}}>
                    <thead>
                        <tr>
                            <th style={{width: "10%"}}>S.N</th>
                            <th style={{width: "20%"}}>Transactions</th>
                            <th style={{width: "20%"}}>Debit (Rs.)</th>
                            <th style={{width: "20%"}}>Credit (Rs.)</th>
                            <th style={{width: "30%"}}>Date</th>
                        </tr>
                    </thead>
                    {data.map((data,index)=> 
                    <tbody key={data.id}>
                        <tr>
                        <td>{index+1}</td>
                        {data.transaction === "deposit" ?
                        <td>Deposit</td> :
                        <td>Withdraw</td> 
                        }
                        {data.transaction === "withdraw" ?
                        <td>{data.amount}</td> :
                        <td>-</td>
                        }
                        {data.transaction === "deposit" ?
                        <td>{data.amount}</td> :
                        <td>-</td>
                        }
                        <td>{data.date}</td>
                        </tr>
                    </tbody>
                    )}
                    <tfoot className="full-width">
                        <tr>
                            <th></th>
                            <th colSpan="3">Balance</th>
                            <th>{balance}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default TransactionsTable;