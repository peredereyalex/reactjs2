import * as React from 'react';

const ReactHighcharts = require('react-highcharts');

import { ReportsAppsStore } from "./ReportsAppsStore.jsx";

export const ReportsAppsBars = React.createClass({
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

        var store = {};
        this.state.chart.data.forEach(function(object) {
            store[object.user_id] ={}
        });
        this.state.chart.data.forEach(function(object) {
            object.apps.forEach(function(app){
                store[object.user_id][app.app_id] = app;
            });
        });

        var users = [];
        this.state.chart.data.forEach(function(object) {
            var user = ReportsAppsStore.getUser(object.user_id);
            users.push(user.name);
        });

        var buffer = {};
        this.state.chart.headers.forEach(function(app_id) {
            var app = ReportsAppsStore.getApp(app_id);
            buffer[app_id] = {
                'name': app.name,
                'data': [],
            };
        });

        for (var user_id in store) {
            for (var app_id in store[user_id]) {
                buffer[app_id].data.push(parseInt(store[user_id][app_id].time));
            }
        }

        var data = [];
        for (var app_id in buffer) {
            data.push(buffer[app_id]);
        }


        var config = {
            chart: {
                type: 'bar'
            },
            title: {
                text: false
            },
            xAxis: {
                categories: users
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Потраченный минуты'
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: data
        };

        return (
            <div className="pd-chart">
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );

        return (
            <div className="">pie</div>
        );
    }
})
