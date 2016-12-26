import * as React from 'react';

import { DashboardChart } from "./DashboardChart.jsx"
import { DashboardCards } from "./DashboardCards.jsx"
import { DashboardScreenshots } from "./DashboardScreenshots.jsx"
import { DashboardUsers } from "./DashboardUsers.jsx"
import { DashboardNotifications } from "./DashboardNotifications.jsx"

export const Dashboard = React.createClass({
    render() {
        return (
            <div className="x-page">
                <div className="x-page__content">
                    <DashboardCards/>
                    <div className="x-columns">
                        <div className="x-column x-8">
                            <DashboardNotifications/>
                        </div>
                        <div className="x-column x-4">
                            <DashboardUsers/>
                        </div>
                    </div>
                    <DashboardScreenshots/>
                    <DashboardChart/>
                </div>
            </div>
        );
    }
})
