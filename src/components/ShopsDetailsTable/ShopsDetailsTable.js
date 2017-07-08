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
	fixedHeader: false,
	showRowHover: false,
	stripedRows: true,

	selectable: false,
	multiSelectable: false,
	enableSelectAll: false,
	showCheckboxes: false,
};

const tableStyle = {
	tableLayout: 'auto',
	overflow: 'auto',
};

const ShopsDetailsTable = (props) => {
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
					<TableHeaderColumn tooltip="Serial Number">S/N</TableHeaderColumn>
					<TableHeaderColumn tooltip="The City">City</TableHeaderColumn>
					<TableHeaderColumn tooltip="The Region">Region</TableHeaderColumn>
					<TableHeaderColumn tooltip="The Country">Country</TableHeaderColumn>
					<TableHeaderColumn tooltip="Average Temperature">Temp Avg</TableHeaderColumn>
					<TableHeaderColumn tooltip="Maximum Temperature">Temp Max</TableHeaderColumn>
					<TableHeaderColumn tooltip="Minimum Temperature">Temp Min</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody
				showRowHover={tableConfig.showRowHover}
				stripedRows={tableConfig.stripedRows}
				displayRowCheckbox={tableConfig.showCheckboxes}
			>
				{props.data.map( (row, index) => (
					<TableRow key={index}>
						<TableRowColumn>{row.sn}</TableRowColumn>
						<TableRowColumn>{row.city}</TableRowColumn>
						<TableRowColumn>{row.region}</TableRowColumn>
						<TableRowColumn>{row.country}</TableRowColumn>
						<TableRowColumn>{row.tempAvg}</TableRowColumn>
						<TableRowColumn>{row.tempMax}</TableRowColumn>
						<TableRowColumn>{row.tempMin}</TableRowColumn>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};


ShopsDetailsTable.propTypes = {
	data: PropTypes.array,
};

export default ShopsDetailsTable;
