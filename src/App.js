import React, {useEffect, useState} from 'react';
import CampaignsList from './components/CampaignsList/CampaignsList';
import Loader from './components/Loader/Loader';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import campaigns from './files/campaigns';
import Container from 'react-bootstrap/Container'
import './App.scss'

const axios = require('axios');
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

const transformData = (data) => {
    return campaigns.filter((item) => {
        let startDate = Date.parse(item.startDate);
        let endDate = Date.parse(item.endDate);
        let currentDate = new Date().getTime();

        item.budgetInUSD = Math.round(item.Budget / 1000) + 'k USD';
        startDate < currentDate && currentDate < endDate ? item.activeStatus = true : item.activeStatus = false;
        return endDate > startDate;

    }).map((item) => {
        const match = data.find(e => e.id === item.userId);

        match ? item.username = match.username : item.username = 'No User Name';
        return item;
    });
};

const getData = () => {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
             .then((response) => {
                 resolve(transformData(response.data));
             })
             .catch((error) => {
                 reject(error.message);
             })
    })
};

const List = () => {
    const [status, setStatus] = useState('LOADING');
    const [campaigns, setCampaigns] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData().then((data) => {
            setCampaigns(data);
            setStatus('DONE');
        }).catch((err) => {
            setError(err);
        });
    }, []);

    return (
        <Container>
            {error ?
                <ErrorHandler message={error}/> : status === 'LOADING' ?
                    <Loader/> : <CampaignsList campaigns={campaigns}/>
            }
        </Container>
    );
};

export default List