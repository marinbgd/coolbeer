import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import sideMenu from '../containers/SideMenu/SideMenu.reducer';

const rootReducer = combineReducers({
	fuelSavings,
	sideMenu,
	routing: routerReducer
});

export default rootReducer;
