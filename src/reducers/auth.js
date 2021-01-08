import { AUTH_USER, USER_BALANCE, USER_TRANSACTIONS, WITHDRAW_MONEY, DEPOSIT_MONEY, USER_LOANS, ALLUSER_TRANSACTIONS, EDITLOAN_BYAGENT, REQUESTLOAN_BYAGENT, REGISTER_USER, SUCCESS_MESSAGE, UPDATELOANSTATUS_BANKER } from '../actions/types';
import { AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
    errorMessage: '',
    successMessage: '',
    storedData: '',
    registerUser: '',
    userTransactions: '',
    userLoans: '',
    userBalance: '',
    withdrawMoney: '',
    updateLoanStatusBanker: ''
};

// eslint-disable-next-line
export default function(state= INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { 
                ...state,
                storedData: action.payload
            };
        case REGISTER_USER:
            return { 
                ...state,
                registerUser: action.payload
            };
        case USER_BALANCE:
            return { 
                ...state,
                balance: action.payload
            };
        case SUCCESS_MESSAGE:
            return { ...state, successMessage: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case USER_TRANSACTIONS:
            return { ...state, userTransactions: action.payload };
        case USER_LOANS:
            return { ...state, userLoans: action.payload };
        case WITHDRAW_MONEY:
            return { ...state, withdrawMoney: action.payload };
        case DEPOSIT_MONEY:
            return { ...state, depositMoney: action.payload };
        // agent
        case ALLUSER_TRANSACTIONS:
            return { ...state, allUserTransactions: action.payload };
        case REQUESTLOAN_BYAGENT:
            return { ...state, requestLoanAmountByAgent: action.payload };
        case EDITLOAN_BYAGENT:
            return { ...state, editLoanAmountByAgent: action.payload };
        case UPDATELOANSTATUS_BANKER:
            return { ...state, updateLoanStatusBanker: action.payload };
        default:
            return state;
    }
}