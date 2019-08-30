import {combineReducers} from 'redux';
import ItemReducer from './ItemReducer';
import ItemtypeReducer from './ItemtypeReducer';
import DepartmentReducer from './DepartmentReducer';

const rootReducer = combineReducers({
    items: ItemReducer,
    itemtypes: ItemtypeReducer,
    departments: DepartmentReducer
})

export default rootReducer;