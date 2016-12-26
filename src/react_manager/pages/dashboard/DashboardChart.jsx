import * as React from 'react';
import { ApplicationStore } from '../../stores/ApplicationStore.jsx';

const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');

window.dashboard = {
    timer: null
};

export const DashboardChart = React.createClass({
    getInitialState() {
        return {chart: []};
    },
    componentDidMount() {
        $.ajax({
            url: 'http://api.dreel.ru/dashboard/chart',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token()
            }
        }).done(function(response) {
            this.setState({chart: response.chart});
        }.bind(this))
    },
    componentWillUnmount() {
        clearInterval(window.dashboard.timer);
    },
    render() {
        var users = [];
        var mouse = [];
        var keyboard = [];
        this.state.chart.forEach(function(data) {
            users.push([
                data.timestamp,
                parseInt(data.users)
            ]);
            mouse.push([
                data.timestamp,
                parseInt(data.mouse)
            ]);
            keyboard.push([
                data.timestamp,
                parseInt(data.keyboard)
            ]);
        });

        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            lang: {
                rangeSelectorZoom: ''
            }
        });
        var config = {
            chart: {
                type: 'spline',
                marginRight: 10,
                animation: Highcharts.svg,
                events: {
                    load() {
                        var users = this.series[0];
                        var mouse = this.series[1];
                        var keyboard = this.series[2];

                        window.dashboard.timer = setInterval(function () {
                            $.ajax({
                                url: 'http://api.dreel.ru/dashboard/chart',
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    access_token: ApplicationStore.token(),
                                    now: 'Y',
                                }
                            }).done(function(response) {
                                if(!users.data)
                                    return;
                                users.addPoint([response.chart.timestamp, parseInt(response.chart.users)], true, true);
                                mouse.addPoint([response.chart.timestamp, parseInt(response.chart.mouse)], true, true);
                                keyboard.addPoint([response.chart.timestamp, parseInt(response.chart.keyboard)], true, true);
                            });
                        }, 60000);
                    }
                }
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                split: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                tickmarkPlacement: 'on',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: [
                { //users
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: false
                    },
                    'softMax': 20,
                    'min': 0

                }, { //mouse
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: false
                    },
                    softMax: 50,
                    min: 0
                }, { //keyboard
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: false
                    },
                    softMax: 80,
                    min: 0
                }
            ],
            title: {
                text: 'Онлайн статистика'
            },
            series: [
                {
                    yAxis: 0,
                    type: 'spline',
                    name: 'Сотрудников онлайн',
                    data: users,
                    tooltip: {
                        enabled: false
                    }
                }, {
                    yAxis: 1,
                    type: 'spline',
                    name: 'Кликов мышкой',
                    data: mouse,
                    tooltip: {
                        enabled: false
                    }
                }, {
                    yAxis: 2,
                    type: 'spline',
                    name: 'Нажатий клавиш',
                    data: keyboard,
                    tooltip: {
                        enabled: false
                    }
                },
            ]
        };

        return (
            <div className="x-columns">
                <div className="x-12">
                    <ReactHighcharts config={config}></ReactHighcharts>
                </div>
            </div>
        );
    }
})
