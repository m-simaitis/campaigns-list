import React from 'react';
import {Spinner} from 'react-bootstrap';
import './Loader.scss';

const Loader = () => {
    return (
        <div className='spinnerHolder'>
            <Spinner animation='border' variant='primary'/>
        </div>
    )
};
export default Loader
