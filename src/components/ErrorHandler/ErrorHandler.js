import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorHandler = props => {
    return (
        <Alert variant='danger'>
            <Alert.Heading>Error</Alert.Heading>
            <p>
                {props.message}
            </p>
        </Alert>
    )
};
export default ErrorHandler
