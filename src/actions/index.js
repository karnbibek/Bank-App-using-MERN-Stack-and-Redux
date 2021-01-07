import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, USER_TRANSACTIONS, WITHDRAW_MONEY, DEPOSIT_MONEY, USER_BALANCE, USER_LOANS, ALLUSER_TRANSACTIONS, EDITLOAN_BYAGENT, REQUESTLOAN_BYAGENT, SUCCESS_MESSAGE, UPDATELOANSTATUS_BANKER } from './types';

export const signin = ( route ,formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:3001/accounts/${route}`, {
            formProps
        });

        dispatch({ type: AUTH_USER, payload: response.data });
        localStorage.setItem('data', JSON.stringify({
            userId: response.data.userId,
            email: response.data.email,
            role: response.data.role,
            token: response.data.token,
            // balance: response.data.balance
        }));
        callback();
        console.log('callback called');
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const register = ( route, token, formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:3001/accounts/${route}`, {
            formProps
        },
        {
            headers: {
                Authorization: token
            }
        }
        );

        // dispatch({ type: AUTH_USER, payload: response.data });
        dispatch({ type: SUCCESS_MESSAGE, payload: "User created successfully!" });
        callback();
        // console.log('callback called');
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const signout = () => {
    localStorage.removeItem('data');

    return {
        type: AUTH_USER,
        payload: ''
    }
}

export const userBalance = ( uid, token ) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/transactions/user-balance?uid=`+uid
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: USER_BALANCE, payload: response.data.balance });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const userTransactions = ( uid, token ) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/transactions/user-transaction?uid=`+uid
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: USER_TRANSACTIONS, payload: response.data.transactions });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const userTransactionsByAgent = ( uid, token, user ) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/transactions/${user}?uid=`+uid
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: USER_TRANSACTIONS, payload: response.data.transactions });
    } catch (e) {
        console.log(e.response.data.message);
        dispatch({ type: AUTH_ERROR, payload: e })
    }
};

export const userLoanDetails = ( uid, token, role ) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/user/loan/${role}/loan-details?uid=`+uid
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: USER_LOANS, payload: response.data.loans });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const withdrawMoney = ( amount, token, callback ) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:3001/transactions/withdraw-money`
        , {
            amount
        }
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: WITHDRAW_MONEY, payload: response.data });
        callback();
    } catch (e) {
        console.log(e.response.data.message);
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const depositMoney = ( amount, token, callback ) => async dispatch => {
    try {
        console.log(token);
        const response = await axios.post(`http://localhost:3001/transactions/deposit-money`
        , {
            amount
        }
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: DEPOSIT_MONEY, payload: response.data });
        callback();
    } catch (e) {
        console.log(e.response.data.message);
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const allUsersAccountDetails = ( token, role ) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/accounts/${role}/customerDetails`
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: ALLUSER_TRANSACTIONS, payload: response.data.accounts });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const editLoanAmountByAgent = ( loanAmount, token, uid, lid, callback ) => async dispatch => {
    try {
        console.log(token);
        const response = await axios.patch(`http://localhost:3001/user/loan/agent/edit-loan?uid=` + uid + `&lid=` + lid
        , {
            loanAmount
        }
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: EDITLOAN_BYAGENT, payload: response.data });
        callback();
    } catch (e) {
        console.log(e.response.data.message);
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const requestLoanByAgent = ( loanAmount, duration, rateOfInterest, uid, token, callback ) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:3001/user/loan/agent/requestLoan?uid=` + uid
        , {
            loanAmount,
            duration, 
            rateOfInterest
        }
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: REQUESTLOAN_BYAGENT, payload: response.data });
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};

export const updateLoanStatusByBanker = ( loanStatus, token, uid, lid, callback ) => async dispatch => {
    try {
        const response = await axios.patch(`http://localhost:3001/user/loan/banker/update-loan-status?uid=` + uid + `&lid=` + lid
        , {
            loanStatus
        }
        , {
            headers: {
                Authorization: token
            }
        })
        dispatch({ type: UPDATELOANSTATUS_BANKER, payload: response.data });
        callback();
    } catch (e) {
        console.log(e.response.data.message);
        dispatch({ type: AUTH_ERROR, payload: e.response.data.message })
    }
};
