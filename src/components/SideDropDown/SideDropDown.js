import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';

const SideDropDown = (props) => {
	const unselectedDropDownElement = {
		id: undefined,
		name: props.unselectedText || 'Select...',
	};

	const items = cloneDeep(props.items);
	items.unshift(unselectedDropDownElement);
	return (
		<DropDownMenu
			value={(props.selectedItemId)}
			onChange={props.onSelectionChange}
			maxHeight={300}>
			{items.map((item, index) => {
				return <MenuItem key={index} value={item.id} primaryText={item.name} />;
			})}
		</DropDownMenu>
	);
};

SideDropDown.propTypes = {
	selectedItemId: PropTypes.number,
	onSelectionChange: PropTypes.func,
	items: PropTypes.array.isRequired,
	unselectedText: PropTypes.string,
};

export default SideDropDown;
