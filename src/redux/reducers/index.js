import {combineReducers} from 'redux';
import { reducer as reduxForm } from 'redux-form';
import ItemReducer from './ItemReducer';
import ItemtypeReducer from './ItemtypeReducer';
import DepartmentReducer from './DepartmentReducer';

const rootReducer = combineReducers({
    items: ItemReducer,
    itemtypes: ItemtypeReducer,
    departments: DepartmentReducer,
    form : reduxForm
})

export default rootReducer;