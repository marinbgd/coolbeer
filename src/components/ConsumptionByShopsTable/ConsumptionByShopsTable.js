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
	height: 'auto',
	fixedHeader: false,
	showRowHover: false,
	stripedRows: true,

	selectable: false,
	multiSelectable: false,
	enableSelectAll: false,
	showCheckboxes: false,

	deselectOnClickaway: false,
	preScanRows: false,
};

const tableStyle = {
	tableLayout: 'auto',
	overflow: 'auto',
};

class ConsumptionByShopsTable extends React.Component {
	constructor(props) {
		super(props);
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
			>
				<TableHeader
					displaySelectAll={tableConfig.enableSelectAll}
					enableSelectAll={tableConfig.enableSelectAll}
					adjustForCheckbox={tableConfig.showCheckboxes}
				>
					<TableRow>
						<TableHeaderColumn tooltip="Shop Name">Shop Name</TableHeaderColumn>
						<TableHeaderColumn tooltip="Total Consumption">Total Consumption</TableHeaderColumn>
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
						<TableRow key={index}>
							<TableRowColumn>{row.shopName}</TableRowColumn>
							<TableRowColumn>{row.totalConsumption}</TableRowColumn>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	}
}

ConsumptionByShopsTable.propTypes = {
	data: PropTypes.array,
};

export default ConsumptionByShopsTable;
