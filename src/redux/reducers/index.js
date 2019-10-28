import { combineReducers } from 'redux'

import DepartmentReducer from './departmentReducer'
import ItemtypeReducer from './itemtypeReducer'
import TypeReducer from './typeReducer'
import ItemReducer from './itemReducer'

const rootReducer = combineReducers({
    departments : DepartmentReducer,
    itemTypes : ItemtypeReducer,
    types : TypeReducer,
    items : ItemReducer,
})

export default rootReducer