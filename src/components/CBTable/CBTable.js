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
	showRowHover: true,
	stripedRows: true,

	selectable: true,
	multiSelectable: true,
	enableSelectAll: true,
	showCheckboxes: true,
};

const tableStyle = {
	tableLayout: 'auto',
	overflow: 'auto',
};

const CBTable = (props) => {
	return (
		<Table
			style={tableStyle}
			bodyStyle={tableStyle}
			height={tableConfig.height}
			fixedHeader={tableConfig.fixedHeader}
			fixedFooter={tableConfig.fixedFooter}
			selectable={tableConfig.selectable}
			multiSelectable={tableConfig.multiSelectable}
		>
			<TableHeader
				displaySelectAll={tableConfig.showCheckboxes}
				adjustForCheckbox={tableConfig.showCheckboxes}
				enableSelectAll={tableConfig.enableSelectAll}
			>
				<TableRow>
					<TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
					<TableHeaderColumn tooltip="The City">City</TableHeaderColumn>
					<TableHeaderColumn tooltip="The Region">Region</TableHeaderColumn>
					<TableHeaderColumn tooltip="The Country">Country</TableHeaderColumn>
					<TableHeaderColumn tooltip="Line 1">Linija1</TableHeaderColumn>
					<TableHeaderColumn tooltip="Line 2">Linija2</TableHeaderColumn>
					<TableHeaderColumn tooltip="Line 3">Linija3</TableHeaderColumn>
					<TableHeaderColumn tooltip="Line 4">Linija4</TableHeaderColumn>
					<TableHeaderColumn tooltip="Total">Total</TableHeaderColumn>
					<TableHeaderColumn tooltip="Date">Datum</TableHeaderColumn>
					<TableHeaderColumn tooltip="Type">Tip</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody
				showRowHover={tableConfig.showRowHover}
				stripedRows={tableConfig.stripedRows}
				displayRowCheckbox={tableConfig.showCheckboxes}
			>
				{props.data.map( (row, index) => (
					<TableRow key={index}>
						<TableRowColumn>{row.id}</TableRowColumn>
						<TableRowColumn>{row.city}</TableRowColumn>
						<TableRowColumn>{row.region}</TableRowColumn>
						<TableRowColumn>{row.country}</TableRowColumn>
						<TableRowColumn>{row.Linija1}</TableRowColumn>
						<TableRowColumn>{row.Linija2}</TableRowColumn>
						<TableRowColumn>{row.Linija3}</TableRowColumn>
						<TableRowColumn>{row.Linija4}</TableRowColumn>
						<TableRowColumn>{row.Total}</TableRowColumn>
						<TableRowColumn>{moment(row.datum).format('D/M/YYYY H:mm:ss')}</TableRowColumn>
						<TableRowColumn>{row.tip}</TableRowColumn>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};


CBTable.propTypes = {
	data: PropTypes.array,
};

export default CBTable;
