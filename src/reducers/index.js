import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import sideMenu from '../containers/SideMenu/SideMenu.reducer';
import homePage from '../containers/Home/HomePage.reducer';

const rootReducer = combineReducers({
	sideMenu,
	homePage,
	routing: routerReducer
});

export default rootReducer;
