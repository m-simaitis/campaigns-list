import React from 'react';
import ReactTable from 'react-table'
import {sortByDate, sortByStatus, sortByBudget} from "../../utils/helpers";
import './CampaignsList.scss';
import 'react-table/react-table.css'

const CampaignsList = props => {
    const data = props.campaigns;
    const columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Start date',
            accessor: 'startDate',
            sortMethod: (a, b) => sortByDate(a, b)
        },
        {
            Header: 'End date',
            accessor: 'endDate',
            sortMethod: (a, b) => sortByDate(a, b)
        },
        {
            id: 'activeStatus',
            Header: 'Status',
            sortMethod: (a, b) => sortByStatus(a, b),
            accessor: record => {
                if (record.activeStatus) return <div data-sort={1} className='campaignStatus campaignStatus--active'/>
                return<div data-sort={0} className='campaignStatus campaignStatus--disabled'/>
            },
        },
        {
            Header: 'Budget',
            accessor: 'budgetInUSD',
            sortMethod: (a, b) => sortByBudget(a, b)
        },
        {
            Header: 'User name',
            accessor: 'username'
        },
    ];

    return <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
    />
};

export default CampaignsList



