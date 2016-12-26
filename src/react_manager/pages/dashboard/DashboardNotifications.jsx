import * as React from 'react';
import { Link } from 'react-router';

import PerfectScrollbar from 'react-perfect-scrollbar'

import { ApplicationStore } from '../../stores/ApplicationStore.jsx';
import { DashboardStore } from './DashboardStore.jsx';

export const DashboardNotifications = React.createClass({
    getInitialState() {
        return {
            items: DashboardStore.notifications
        };
    },
    componentDidMount() {
        DashboardStore.bind(DashboardStore.events.notifications.updated, this.dataUpdated);
        DashboardStore.getNotifications();
        this.dataUpdated();
    },
    componentWillUnmount() {
        DashboardStore.unbind(DashboardStore.events.notifications.updated, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: DashboardStore.notifications
        });
    },
    render() {
        var notifications = this.state.items.map(function(item){
            var notification = "";
            switch(item.type){
                case "user_new":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                Добавлен новый пользователь {item.user_name}
                            </div>
                        </div>;
                    break;
                case "project_user_add":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                {item.user_name} добавлен в проект {item.project_name}
                            </div>
                        </div>;
                    break;
                case "project_user_delete":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                 {item.user_name} удален из проекта {item.project_name}
                            </div>
                        </div>;
                    break;
                case "project_new":
                    notification = <div key={item.id} className="x-widget__item x-widget__row">
                                        <div className="x-flex-top x-8">
                                            <div className="x-widget__icon"></div>
                                            <div>
                                                <div className="x-widget__date">{item.date}</div>
                                                <div className="x-notification">
                                                    Создан новый проект
                                                    <Link to={"/user/"+item.user_id} className="x-notification__project"> {item.project_name}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>;

                    break;
                case "history_start":
                    notification = <div key={item.id} className="x-widget__item x-widget__row">
                                        <div className="x-flex-top x-8">
                                            <div className="x-widget__photo" style={{backgroundImage: "url("+item.user_photo+")"}}></div>
                                            <div>
                                                <div className="x-widget__date">{item.date}</div>
                                                <div className="x-notification">
                                                    <Link to={"/user/"+item.user_id} className="x-notification__user">{item.user_name}</Link>
                                                    начал работать над задачей
                                                    <Link to={"/task/edit/"+item.task_id} className="x-notification__task">{item.task_name}</Link>
                                                    в проекте
                                                    <Link to={"/project/detail/"+item.project_id} className="x-notification__project">{item.project_name}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>;
                    break;
                case "history_finish":
                    notification = <div key={item.id} className="x-widget__item x-widget__row">
                                        <div className="x-flex-top x-8">
                                            <div className="x-widget__photo" style={{backgroundImage: "url("+item.user_photo+")"}}></div>
                                            <div>
                                                <div className="x-widget__date">{item.date}</div>
                                                <div className="x-notification">
                                                    <Link to={"/user/"+item.user_id} className="x-notification__user">{item.user_name}</Link>
                                                    прекратил работать
                                                </div>
                                            </div>
                                        </div>
                                    </div>;
                    break;
                case "task_done":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                Задача {item.task_name} в проекте {item.project_name} была завершена
                            </div>
                        </div>;
                    break;
                case "task_new":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                Новая задача {item.task_name} в проекте {item.project_name}
                            </div>
                        </div>;
                    break;
                case "project_archive":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                Проект {item.project_name} был заархивирован
                            </div>
                        </div>;
                    break;
                case "cheap_app":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                {item.user_name} использовал неэффективное приложение {item.app_name}
                            </div>
                        </div>;
                    break;
                case "cheap_url":
                    notification = <div key={item.id} className="x-widget__row x-widget__item x-columns">
                            <div className="x-column x-1">
                                {item.date}
                            </div>
                            <div className="x-column x-11">
                                {item.user_name} посетил неэффективный сайт {item.app_url}
                            </div>
                        </div>;
                    break;
            }


            return notification

        });
        return (
            <div className="x-widget">
                <div className="x-widget__head">
                    Уведомления
                </div>
                <div className="x-widget__scroll x-widget__body">
                    <PerfectScrollbar>
                        {notifications}
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
})
