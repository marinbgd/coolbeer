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

import { filter } from 'lodash';

const handleRowSelection = (rows, cb) => {
	return selectedRowIndexes => {
		if (typeof cb !== 'function') { return; }
		let selectedRowIds = filter(rows, (row, index) => ~selectedRowIndexes.indexOf(index)).map( row => row.sn);
		cb(selectedRowIds);
	};
};

const ShopsTable = (props) => {
	return (
		<Table
			style={tableStyle}
			bodyStyle={tableStyle}
			height={tableConfig.height}
			fixedHeader={tableConfig.fixedHeader}
			fixedFooter={tableConfig.fixedFooter}
			selectable={tableConfig.selectable}
			multiSelectable={tableConfig.multiSelectable}
			onRowSelection={handleRowSelection(props.data, props.onRowSelection)}
		>
			<TableHeader
				displaySelectAll={tableConfig.enableSelectAll}
				enableSelectAll={tableConfig.enableSelectAll}
				adjustForCheckbox={tableConfig.showCheckboxes}
			>
				<TableRow>
					<TableHeaderColumn tooltip="Serial Number">S/N</TableHeaderColumn>
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
				{props.data.map( (row, index) => (
					<TableRow key={index} selected={row._selected}>
						<TableRowColumn>{row.sn}</TableRowColumn>
						<TableRowColumn>{row.city}</TableRowColumn>
						<TableRowColumn>{row.region}</TableRowColumn>
						<TableRowColumn>{row.country}</TableRowColumn>
						<TableRowColumn>{moment(row.datum).format('D/M/YYYY H:mm:ss')}</TableRowColumn>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};


ShopsTable.propTypes = {
	data: PropTypes.array,
	onRowSelection: PropTypes.func,
};

export default ShopsTable;
