import * as React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar'

import {ApplicationStore} from '../../stores/ApplicationStore.jsx';

export const DashboardUsers = React.createClass({
    getInitialState() {
        return {items: []};
    },
    componentDidMount() {
        $.ajax({
            url: 'http://api.dreel.ru/dashboard/users/',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token()
            }
        }).done(function(response) {
            this.setState({
                items: response.items
            });
        }.bind(this));
    },
    componentWillUnmount() {
    },
    render() {
        console.log(this.state);
        var users = this.state.items.map(function(user){
            return (
                <div key={user.user_id} className="x-widget__item x-widget__row x-flex-between">
                    <div className="x-flex-vertical x-8">
                        <div className="x-widget__photo" style={{backgroundImage: "url("+user.user_photo+")"}}></div>
                        <div className="x-widget__text">{user.user_name}</div>
                    </div>
                </div>
            );
        }.bind(this));
        return (
            <div className="x-widget">
                <div className="x-widget__head x-widget__head_blue x-flex-between">
                    <span>Сейчас работают</span>
                </div>
                <div className="x-widget__body">
                    <div style={{height: '400px'}}>
                        <PerfectScrollbar>
                            {users}
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        );
    }
})
