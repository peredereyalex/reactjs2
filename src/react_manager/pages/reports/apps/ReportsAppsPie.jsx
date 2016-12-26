import * as React from 'react';

const ReactHighcharts = require('react-highcharts');

import { ReportsAppsStore } from "./ReportsAppsStore.jsx";

export const ReportsAppsPie = React.createClass({
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
        var counter = {};
        this.state.chart.headers.forEach(function(app_id) {
            counter[app_id] = 0;
        });

        this.state.chart.data.forEach(function(object) {
            object.apps.forEach(function(app){
                counter[app.app_id] = counter[app.app_id] + parseInt(app.time);
            });
        });

        var data = [];
        for (var app_id in counter) {
            var app = ReportsAppsStore.getApp(app_id);
            data.push({
                name: app.name,
                y: counter[app_id]
            });
        }

        var config = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: false
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
        };

        return (
            <div className="pd-chart">
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );

    }
})
