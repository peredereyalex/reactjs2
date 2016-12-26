import * as React from 'react';

import { ReportsAppsStore } from "./ReportsAppsStore.jsx";

export const ReportsAppsTable = React.createClass({
    getInitialState() {
        return({
            chart: ReportsAppsStore.chart
        })
    },
    componentDidMount() {
        this.dataUpdated();
        ReportsAppsStore.bind(ReportsAppsStore.events.data.updated, this.dataUpdated);
    },
    componentWillUnmount() {
        ReportsAppsStore.unbind(ReportsAppsStore.events.data.updated, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            chart: ReportsAppsStore.chart
        });
    },
    render() {
        var head = this.state.chart.headers.map(function(app_id) {
            var app = ReportsAppsStore.getApp(app_id);
            return <div key={app_id} className="table__cell">{app.name}</div>
        });
        var data = this.state.chart.data.map(function(object) {
            var user = ReportsAppsStore.getUser(object.user_id);
            var cells = object.apps.map(function(app) {
                return <div key={app.app_id} className="table__cell table__cell-nowrap">{app.time_pretty}</div>
            });
            return (
                <div key={object.user_id} className="table__row">
                    <div className="table__cell">{user.name}</div>
                    {cells}
                </div>
            );
        });
        return (
            <div className="reports-apps-table table-container">
                <div className="table">
                    <div className="table__head">
                         <div className="table__cell">Сотрудник</div>
                        {head}
                    </div>
                    {data}
                </div>
            </div>
        );
    }
})
