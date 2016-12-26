import * as React from 'react';
import { ApplicationStore } from '../../stores/ApplicationStore.jsx';

export const DashboardCards = React.createClass({
    getInitialState() {
        return {
            money: 0,
            users: 0,
            projects: 0,
            tasks: 0,
        };
    },
    componentDidMount() {
        $.ajax({
            url: 'http://api.dreel.ru/dashboard/cards',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token()
            }
        }).done(function(response) {
            this.setState({
                money: response.money,
                users: response.users,
                projects: response.projects,
                tasks: response.tasks,
            });
        }.bind(this))
    },
    componentWillUnmount() {
    },
    render() {
        return (
            <div className="x-columns">
                <div className="x-column x-3">
                    <div className="x-card" style={{backgroundColor: "#2f353b"}}>
                        <div className="x-card__value">{this.state.money}р</div>
                        <div className="x-card__description">Потрачено денег</div>
                    </div>
                </div>
                <div className="x-column x-3">
                    <div className="x-card" style={{backgroundColor: "#3598dc"}}>
                        <div className="x-card__value">{this.state.users}</div>
                        <div className="x-card__description">Сотрудников в компании</div>
                    </div>
                </div>
                <div className="x-column x-3">
                    <div className="x-card" style={{backgroundColor: "#44b6ae"}}>
                        <div className="x-card__value">{this.state.projects}</div>
                        <div className="x-card__description">Активных проектов</div>
                    </div>
                </div>
                <div className="x-column x-3">
                    <div className="x-card" style={{backgroundColor: "#592bad"}}>
                        <div className="x-card__value">{this.state.tasks}</div>
                        <div className="x-card__description">Активных задач</div>
                    </div>
                </div>
            </div>
        );
    }
})
