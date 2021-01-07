import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';
import Welcome from './pages/Welcome';
import Signout from './pages/Signout';
import CustomerLogin from './pages/CustomerLogin';
import AgentLogin from './pages/AgentLogin';
import BankerLogin from './pages/BankerLogin';

import Transactions from './components/customer-protected/Transactions';
import Withdraw from './components/customer-protected/Withdraw';
import Deposit from './components/customer-protected/Deposit';
import LoanDetails from './components/customer-protected/LoanDetails';

import AgentDetails from './components/agent-protected/AgentDetails';
import UserTransactions from './components/agent-protected/UserTransactions';
import UserLoanDetails from './components/agent-protected/UserLoanDetails';
import LoanRequest from './components/agent-protected/LoanRequest';
import UpdateLoan from './components/agent-protected/UpdateLoan';

import BankerDetails from './components/banker-protected/BankerDetails';
import RegisterAgent from './components/banker-protected/RegisterAgent';
import RegisterBanker from './components/banker-protected/RegisterBanker';
import RegisterCustomer from './components/banker-protected/RegisterCustomer';
import UpdateLoanStatus from './components/banker-protected/UpdateLoanStatus';


import requireAuth from './authentication/requireAuth'
// const storedData = JSON.parse(localStorage.getItem('data'));

const store = createStore(
  reducers,
  {auth: {
    storedData: JSON.parse(localStorage.getItem('data'))
  } },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App>
      <Route path="/" exact component={Welcome} />
      <Route path="/signout" component={Signout} />
      <Route path="/agent-login" component={AgentLogin} />
      <Route path="/banker-login" component={BankerLogin} />
      <Route path="/customer-login" component={CustomerLogin} />

      <Route path="/customer" exact component={requireAuth(Transactions)} />
      <Route path="/customer/withdraw" exact component={requireAuth(Withdraw)} />
      <Route path="/customer/deposit" exact component={requireAuth(Deposit)} />
      <Route path="/customer/loan-details" exact component={requireAuth(LoanDetails)} />

      <Route path="/agent" exact component={requireAuth(AgentDetails)} />
      <Route path="/agent/customerDetails" exact component={requireAuth(UserTransactions)} />
      <Route path="/agent/customer/loan-details" exact component={requireAuth(UserLoanDetails)} />
      <Route path="/agent/customer/request-loan" exact component={requireAuth(LoanRequest)} />
      <Route path="/agent/customer/update-loan" exact component={requireAuth(UpdateLoan)} />

      <Route path="/banker" exact component={requireAuth(BankerDetails)} />
      <Route path="/banker/register-agent" exact component={requireAuth(RegisterAgent)} />
      <Route path="/banker/register-banker" exact component={requireAuth(RegisterBanker)} />
      <Route path="/banker/register-customer" exact component={requireAuth(RegisterCustomer)} />
      <Route path="/banker/customerDetails" exact component={requireAuth(UserTransactions)} />
      <Route path="/banker/customer/loan-details" exact component={requireAuth(UserLoanDetails)} />
      <Route path="/banker/customer/update-loan-status" exact component={requireAuth(UpdateLoanStatus)} />

    </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);