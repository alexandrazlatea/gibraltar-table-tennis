import { combineReducers } from 'redux';
import UsersData from '../reducers/reducers_users_data';
import Results from '../reducers/reducers_results';

const rootReducer = combineReducers({
    usersData: UsersData,
    results: Results
});

export default rootReducer;