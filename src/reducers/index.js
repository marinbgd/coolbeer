import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import sideMenu from '../containers/SideMenu/SideMenu.reducer';
import homePage from '../containers/Home/HomePage.reducer';
import byShops from '../containers/ByShops/ByShops.reducer';

const rootReducer = combineReducers({
	sideMenu,
	homePage,
	byShops,
	routing: routerReducer
});

export default rootReducer;
