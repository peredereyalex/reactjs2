import * as React from 'react';

import {Router, Link, browserHistory} from 'react-router'

export const Sidebar = React.createClass({
    componentDidMount() {
        jQuery(document).ready(function($) {
            $(".sidebar__menu>.sidebar__link").click(function(event) {
                $(this).parent().toggleClass('active');
            });
        });
    },
    render() {
        return (
            <div className="sidebar">
                <Link to="/dashboard" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">web</i>
                    <span>Рабочий стол</span>
                </Link>
                <div className="sidebar__menu">
                    <div className="sidebar__link">
                        <i className="mdi mdi-24px">account_balance</i>
                        <span>Компания</span>
                        <i className="mdi mdi-24px sidebar__arrow">keyboard_arrow_left</i>
                    </div>
                    <div className="sidebar__list">
                        {/* <Link to="/company/profile" className="sidebar__link" activeClassName="active">
                            <i className="mdi mdi-24px">assignment</i>
                            <span>Профиль</span>
                        </Link> */}
                        <Link to="/company/invite" className="sidebar__link" activeClassName="active">
                            <i className="mdi mdi-24px">person_add</i>
                            <span>Пригласить</span>
                        </Link>

                    </div>
                </div>
                <Link to="/projects" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">view_module</i>
                    <span>Проекты</span>
                </Link>
                <Link to="/tasks" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">format_list_bulleted</i>
                    <span>Задачи</span>
                </Link>
                <Link to="/screenshots" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">perm_media</i>
                    <span>Скриншоты</span>
                </Link>
                <div className="sidebar__menu">
                    <div className="sidebar__link">
                        <i className="mdi mdi-24px">multiline_chart</i>
                        <span>Отчеты</span>
                        <i className="mdi mdi-24px sidebar__arrow">keyboard_arrow_left</i>
                    </div>
                    <div className="sidebar__list">
                        <Link to="/reports/apps" className="sidebar__link" activeClassName="active">
                            <i className="mdi mdi-24px">video_library</i>
                            <span>По приложениям</span>
                        </Link>
                        <Link to="/reports/user" className="sidebar__link" activeClassName="active">
                            <i className="mdi mdi-24px">assignment_ind</i>
                            <span>По пользователю</span>
                        </Link>
                        <Link to="/reports/project" className="sidebar__link" activeClassName="active">
                            <i className="mdi mdi-24px">dns</i>
                            <span>По проекту</span>
                        </Link>
                    </div>
                </div>
                <Link to="/users" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">supervisor_account</i>
                    <span>Сотрудники</span>
                </Link>
                <div className="sidebar__menu">
                    <div className="sidebar__link">
                        <i className="mdi mdi-24px">settings</i>
                        <span>Настройки</span>
                        <i className="mdi mdi-24px sidebar__arrow">keyboard_arrow_left</i>
                    </div>
                    <div className="sidebar__list">
                        <Link to="/settings/apps" className="sidebar__link" activeClassName="active">
                            <i className="mdi mdi-24px">video_library</i>
                            <span>Для приложений</span>
                        </Link>
                    </div>
                </div>
                <div className="sidebar-downloads">
                    <a href="http://api.dreel.ru/app/macos/Dreel.app-v1.0.3.zip" target="_blank" className="sidebar-downloads__link">
                        {/* <i></i> */}
                        <span>Скачать для MacOS X</span>
                    </a>
                    <a href="http://dev.dreel.ru/app/DreelTimerWindows.zip" target="_blank" className="sidebar-downloads__link">
                        {/* <i></i> */}
                        <span>Скачать для Windows</span>
                    </a>
                </div>


                {/* <Link to="/timesheet" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">art_track</i>
                    <span>Учет времени</span>
                </Link> */}


                {/* <Link to="/help" className="sidebar__link" activeClassName="active">
                    <i className="mdi mdi-24px">question_answer</i>
                    <span>Помощь</span>
                </Link> */}
            </div>
        );
    }
});
