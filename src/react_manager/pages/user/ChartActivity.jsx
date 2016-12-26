import * as React from 'react';
import { ApplicationStore } from '../../stores/ApplicationStore.jsx';

const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');
const ReactHighstock = require('react-highcharts/ReactHighstock.src');

export const ChartActivity = React.createClass({
    getInitialState() {
        return {
            data: []
        };
    },
    componentDidMount() {
        $.ajax({
            url: 'http://api.dreel.ru/user/chartactivity',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token(),
                user_id: this.props.userid,
            }
        })
        .done(function(response) {
            this.setState({
                data: response.chart
            });
        }.bind(this))
    },
    componentWillUnmount() {
    },
    render() {
        var data = this.state.data;

        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            lang: {
                rangeSelectorZoom: ''
            }
        });

        var config = {
            rangeSelector: {
                selected: 1
            },
             yAxis: {
                title: {
                    text: 'Активность'
                },
                'min': 0,
            },
            title: {
                text: 'Активность за сутки'
            },
            legend: {
                enabled: false
            },
            rangeSelector: {
                buttonSpacing: 10,
                buttonTheme:{
                    width: 150,
                },
                inputEnabled: false,
                buttons: [{
                    type: 'minute',
                    count: 30,
                    text: '30 Минут'
                }, {
                    type: 'hour',
                    count: 1,
                    text: 'Час'
                }, {
                    type: 'hour',
                    count: 3,
                    text: '3 часа'
                }, {
                    type: 'hour',
                    count: 6,
                    text: '6 часов'
                },
                {
                    type: 'all',
                    text: 'Сутки'
                }],
                selected: 4
            },
            series: [{
                name: 'Активность',
                threshold: 322 ,
                data: data,
                tooltip: {
                    enabled: false
                }
            }]
        };

        return (
            <ReactHighstock config = {config} ></ReactHighstock>
        );
    }
})
