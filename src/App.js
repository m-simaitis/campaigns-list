import React, {useEffect, useState} from 'react';
import CampaignsList from './components/CampaignsList/CampaignsList';
import Loader from './components/Loader/Loader';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import {Campaigns, ApiUrl} from './Constants';
import Container from 'react-bootstrap/Container';
import './App.scss';

const axios = require('axios');

const transformData = (data) => {
    return Campaigns.filter((item) => {
        return Date.parse(item.endDate) > Date.parse(item.startDate);
    }).map((item) => {
        const currentDate = new Date().getTime();
        const match = data.find(e => e.id === item.userId);
        const username = match ? match.username : 'No User Name';
        const budgetInUSD = Math.round(item.Budget / 1000) + 'k USD';
        const activeStatus = Date.parse(item.startDate) < currentDate && currentDate < Date.parse(item.endDate);

        return {...item, username, budgetInUSD, activeStatus};
    });
};

const getData = () => {
    return new Promise((resolve, reject) => {
        axios.get(ApiUrl)
             .then((response) => {
                 resolve(transformData(response.data));
             })
             .catch((error) => {
                 reject(error.message);
             })
    })
};

const List = () => {
    const [campaigns, setCampaigns] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData().then((data) => {
            setCampaigns(data);
        }).catch((err) => {
            setError(err);
        });
    }, []);

    return (
        <Container>
            {error ?
                <ErrorHandler message={error}/> :
                campaigns ? <CampaignsList campaigns={campaigns}/> : <Loader/>
            }
        </Container>
    );
};

export default List