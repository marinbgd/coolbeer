import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

const tableConfig = {
	height: '300px',
	fixedHeader: false,
	showRowHover: false,
	stripedRows: true,

	selectable: true,
	multiSelectable: true,
	enableSelectAll: false,
	showCheckboxes: true,

	deselectOnClickaway: false,
	preScanRows: false,
};

const tableStyle = {
	tableLayout: 'auto',
	overflow: 'auto',
};

import { filter, difference, intersection } from 'lodash';

class ShopsTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedItemsCount: 0,
			selectedItemIds: [],
		};
	}

	handleRowSelection (selectedRowIndexes) {
		let selectedRowIds = filter(this.props.data, (row, index) => ~selectedRowIndexes.indexOf(index)).map( row => row.sn);

		//trim one of the already selected rows if maxSelected is set and exceeded
		if (this.props.maxSelected && (selectedRowIndexes.length > this.props.maxSelected)) {
			let newRowIds = difference(selectedRowIds, this.state.selectedItemIds); //it will be only 1
			let oldRowIds = intersection(selectedRowIds, this.state.selectedItemIds);
			let oldRowIdsToAdd = [];

			if (oldRowIds.length) {
				oldRowIdsToAdd = oldRowIds.slice( -(this.props.maxSelected - 1) );
			}

			selectedRowIds = newRowIds.concat(oldRowIdsToAdd);
		}

		this.setState({ selectedItemIds: selectedRowIds });

		if (typeof this.props.onRowSelection !== 'function') { return; }
		this.props.onRowSelection(selectedRowIds);
	}

	render () {
		return (
			<Table
				style={tableStyle}
				bodyStyle={tableStyle}
				height={tableConfig.height}
				fixedHeader={tableConfig.fixedHeader}
				fixedFooter={tableConfig.fixedFooter}
				selectable={tableConfig.selectable}
				multiSelectable={tableConfig.multiSelectable}
				onRowSelection={this.handleRowSelection.bind(this)}
			>
				<TableHeader
					displaySelectAll={tableConfig.enableSelectAll}
					enableSelectAll={tableConfig.enableSelectAll}
					adjustForCheckbox={tableConfig.showCheckboxes}
				>
					<TableRow>
						<TableHeaderColumn tooltip="Shop Name">Shop Name</TableHeaderColumn>
						<TableHeaderColumn tooltip="The City">City</TableHeaderColumn>
						<TableHeaderColumn tooltip="The Region">Region</TableHeaderColumn>
						<TableHeaderColumn tooltip="The Country">Country</TableHeaderColumn>
						<TableHeaderColumn tooltip="Last Activity Date">Date</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					deselectOnClickaway={tableConfig.deselectOnClickaway}
					preScanRows={tableConfig.preScanRows}
					showRowHover={tableConfig.showRowHover}
					stripedRows={tableConfig.stripedRows}
					displayRowCheckbox={tableConfig.showCheckboxes}
				>
					{this.props.data.map((row, index) => (
						<TableRow key={index} selected={row._selected}>
							<TableRowColumn>{row.shopName}</TableRowColumn>
							<TableRowColumn>{row.city}</TableRowColumn>
							<TableRowColumn>{row.region}</TableRowColumn>
							<TableRowColumn>{row.country}</TableRowColumn>
							<TableRowColumn>{moment(row.datum).format('D/M/YYYY H:mm:ss')}</TableRowColumn>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	}
}

ShopsTable.propTypes = {
	data: PropTypes.array,
	onRowSelection: PropTypes.func,
	maxSelected: PropTypes.number,
};

export default ShopsTable;
