import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import sideMenu from '../containers/SideMenu/SideMenu.reducer';
import homePage from '../containers/Home/HomePage.reducer';

const rootReducer = combineReducers({
	fuelSavings,
	sideMenu,
	homePage,
	routing: routerReducer
});

export default rootReducer;
