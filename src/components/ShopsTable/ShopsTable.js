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
		>
			<TableHeader
				displaySelectAll={tableConfig.showCheckboxes}
				adjustForCheckbox={tableConfig.showCheckboxes}
				enableSelectAll={tableConfig.enableSelectAll}
			>
				<TableRow>
					{/*<TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>*/}
					<TableHeaderColumn tooltip="Serial Number">S/N</TableHeaderColumn>
					<TableHeaderColumn tooltip="The City">City</TableHeaderColumn>
					<TableHeaderColumn tooltip="The Region">Region</TableHeaderColumn>
					<TableHeaderColumn tooltip="The Country">Country</TableHeaderColumn>
					<TableHeaderColumn tooltip="Date">Datum</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody
				showRowHover={tableConfig.showRowHover}
				stripedRows={tableConfig.stripedRows}
				displayRowCheckbox={tableConfig.showCheckboxes}
			>
				{props.data.map( (row, index) => (
					<TableRow key={index}>
						{/*<TableRowColumn>{row.id}</TableRowColumn>*/}
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
};

export default ShopsTable;
