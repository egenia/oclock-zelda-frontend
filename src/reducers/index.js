import { combineReducers } from 'redux';

import usersReducer from './users/usersReducer';
import i18n from './i18n/i18nReducer';


const appReducer = combineReducers({
    i18n,
    users: usersReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};


export default rootReducer;
