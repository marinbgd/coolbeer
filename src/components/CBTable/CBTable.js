import React from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TableBody,
	/*TableFooter,*/
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

const tableConfig = {
	height: '300px',
	fixedHeader: true,
	fixedFooter: true,
	showRowHover: true,
	stripedRows: true,

	selectable: false,
	multiSelectable: false,
	enableSelectAll: false,
	showCheckboxes: false,
};

const CBTable = (props) => {
	return (
		<Table
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
					<TableHeaderColumn tooltip="The City">Grad</TableHeaderColumn>
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
						<TableRowColumn>{row.grad}</TableRowColumn>
						<TableRowColumn>{row.Linija1}</TableRowColumn>
						<TableRowColumn>{row.Linija2}</TableRowColumn>
						<TableRowColumn>{row.Linija3}</TableRowColumn>
						<TableRowColumn>{row.Linija4}</TableRowColumn>
						<TableRowColumn>{row.Total}</TableRowColumn>
						<TableRowColumn>{row.datum}</TableRowColumn>
						<TableRowColumn>{row.tip}</TableRowColumn>
					</TableRow>
				))}
			</TableBody>
			{/*<TableFooter>
				<TableRow>
					<TableRowColumn>ID</TableRowColumn>
					<TableRowColumn>Grad</TableRowColumn>
					<TableRowColumn>Linija1</TableRowColumn>
					<TableRowColumn>Linija2</TableRowColumn>
					<TableRowColumn>Linija3</TableRowColumn>
					<TableRowColumn>Linija4</TableRowColumn>
					<TableRowColumn>Total</TableRowColumn>
					<TableRowColumn>Datum</TableRowColumn>
					<TableRowColumn>Tip</TableRowColumn>
				</TableRow>
			</TableFooter>*/}
		</Table>
	);
};


CBTable.propTypes = {
	data: PropTypes.array,
};

export default CBTable;
