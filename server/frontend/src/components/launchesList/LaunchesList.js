import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const LAUNCHES_QUERY = gql`
query LaunchesQuery{
    launches {
        flight_number
        launch_year
        mission_name
        launch_success
        launch_date_local
      }
}
`;


export default class LaunchesList extends Component {
    render() {
        return (
            <div>
                <h1> Launches list</h1>
            </div>
        )
    }
}