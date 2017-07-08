import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {cyan500} from 'material-ui/styles/colors';


const paperStyleThin = {
	height: '100%',
	width: '100%',
	padding: 10,
	textAlign: 'center',
	display: 'inline-block',
};

const SearchBox = (props) => {
	return (
		<Paper style={paperStyleThin} zDepth={1}>
			<span className="searchShop__icon">
				<FontIcon color={cyan500} className="material-icons">search</FontIcon>
			</span>
			<TextField
				onChange={props.onChangeCb}
				hintText="Shop"
				floatingLabelText="Enter shop name..."
				value={props.value}
			/>
		</Paper>
	);
};

SearchBox.propTypes = {
	onChangeCb: PropTypes.func,
	value: PropTypes.string,
};

export default SearchBox;
