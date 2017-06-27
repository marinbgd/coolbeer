import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const UpdateDataButton = (props) => {
	return (
		<RaisedButton onClick={props.onClickFunc} label="RANDOM DATA" primary={true} />
	);
};


UpdateDataButton.propTypes = {
	onClickFunc: PropTypes.func.isRequired,
};

export default UpdateDataButton;
