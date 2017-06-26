import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const UpdateDataButton = (props) => {
	return (
		<RaisedButton onClick={props.onClickFunc} label="RANDOM DATA" primary={true} />
	);
};

export default UpdateDataButton;
