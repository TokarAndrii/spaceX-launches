import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Moment from 'react-moment';

import styles from './LaunchesList.module.css';
import successIcon from './success.svg';
import failIcon from './thumb.svg';

const LAUNCHES_QUERY = gql`
query LaunchesQuery{
    launches {
        flight_number
        launch_year
        mission_name
        launch_success
        launch_date_local
        launch_date_unix
        rocket {
            rocket_name
            rocket_type 
        }
        links{
            mission_patch_small
        }
    }
}
`;


export default class LaunchesList extends Component {
    render() {
        return (
            <div className={styles.launchesListHolder}>
                <h1 className={styles.launchListTitle}> Launches list:</h1>
                <Query query={LAUNCHES_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error</p>;

                        return console.log(data) || data.launches.map(launch => (
                            <div className={styles.launchListItemContent}>
                                <h3 className={styles.launchListItemContentTitle}>{launch.mission_name}</h3>
                                <div key={launch.flight_number} className={styles.launcItemHolder}>
                                    {launch.links.mission_patch_small !== null
                                        && (<p className={styles.launcItemHolderRowPart}><img className={styles.missionPatch} src={launch.links.mission_patch_small} alt={launch.rocket.rocket_name}></img></p>)}
                                    <p className={styles.launcItemHolderRowPart}>
                                        <span className={styles.launcItemHolderRowTitleValuetext}>flight_number:</span>
                                        <span className={styles.launcItemHolderValueText}>{launch.flight_number}</span>
                                    </p>
                                    <p className={styles.launcItemHolderRowPart}>
                                        <span className={styles.launcItemHolderRowTitleValuetext}>launch_year:</span>
                                        <span className={styles.launcItemHolderValueText}>{launch.launch_year}</span>
                                    </p>
                                    <p className={styles.launcItemHolderRowPart}>
                                        <span className={styles.launcItemHolderRowTitleValuetext}>launch_date:</span>
                                        <span className={styles.launcItemHolderValueText}><Moment format="DD-MMMM HH:mm">{launch.launch_date_local}</Moment></span>
                                    </p>
                                    <p className={styles.launcItemHolderRowPart}>
                                        <span className={styles.launcItemHolderRowTitleValuetext}>success:</span>
                                        <span className={styles.launcItemHolderValueImages}>{launch.launch_success ? <img src={successIcon} alt="success_icon"></img> : <img src={failIcon} alt="fail_icon"></img>}</span>
                                    </p>
                                    <p className={styles.launcItemHolderRowPart}><span className={styles.launcItemHolderRowTitleValuetext}>rocket name:</span><span className={styles.launcItemHolderValueText}>{launch.rocket.rocket_name}</span></p>
                                    <p className={styles.launcItemHolderRowPart}><span className={styles.launcItemHolderRowTitleValuetext}>rocket type:</span><span className={styles.launcItemHolderValueText}>{launch.rocket.rocket_type}</span></p>
                                </div>
                            </div>
                        )
                        );
                    }}
                </Query>
            </div>
        )
    }
}