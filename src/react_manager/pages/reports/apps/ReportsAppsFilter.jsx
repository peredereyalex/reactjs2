import * as React from 'react';

var DatePicker = require('react-datepicker');

import { ReportsAppsStore } from "./ReportsAppsStore.jsx";

import { FilterTags } from '../../../components/FilterTags.jsx';
import { Select } from '../../../components/Select.jsx';

export const ReportsAppsFilter = React.createClass({
    getInitialState() {
        return({
            filter: ReportsAppsStore.filter,
            apps: ReportsAppsStore.data.apps,
            users: ReportsAppsStore.data.users,
        })
    },
    componentDidMount() {
        this.dataUpdated();
        ReportsAppsStore.bind(ReportsAppsStore.events.data.updated, this.dataUpdated);

        ReportsAppsStore.getInfo();
    },
    componentWillUnmount() {
        ReportsAppsStore.unbind(ReportsAppsStore.events.data.updated, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            filter: ReportsAppsStore.filter,
            apps: ReportsAppsStore.data.apps,
            users: ReportsAppsStore.data.users,
        });
    },
    filterAdd(name, value){
        ReportsAppsStore.filter[name].push(value);
        ReportsAppsStore.filter[name] = ReportsAppsStore.filter[name].filter((v, i, a) => a.indexOf(v) === i);
        ReportsAppsStore.trigger(ReportsAppsStore.events.data.updated);
    },
    filterDelete(name, value){
        ReportsAppsStore.filter[name] = ReportsAppsStore.filter[name].filter(function(element) {
            return element != value
        });
        ReportsAppsStore.trigger(ReportsAppsStore.events.data.updated);
    },
    filterDate: function(date, value) {
        ReportsAppsStore.filter[date] = value;
        ReportsAppsStore.trigger(ReportsAppsStore.events.data.updated);
    },
    render() {
        return (
            <div className="page-filter">
                <div className="page-filter__row nolabel">
                    <Select class="page-filter__item"
                        search
                        type="icon"
                        value="Выберите программу"
                        items={this.state.apps}
                        onSelect={ (value) => this.filterAdd('apps', value) }
                        label="Список программ"/>
                    <FilterTags
                        tags={this.state.filter.apps}
                        items={this.state.apps}
                        type="icon"
                        onDelete={ (value) => this.filterDelete('apps', value) }
                        label='Выбранные программы'/>
                </div>
                <div className="page-filter__row nolabel">
                    <Select class="page-filter__item"
                        search
                        value="Выберите сотрудника"
                        items={this.state.users}
                        onSelect={ (value) => this.filterAdd('users', value) }
                        label="Список сотрудников"/>
                    <FilterTags
                        tags={this.state.filter.users}
                        items={this.state.users}
                        onDelete={ (value) => this.filterDelete('users', value) }
                        label='Выбранные сотрудники'/>
                </div>
                <div className="page-filter__row">
                    <label>Срез по времени</label>
                    <div className="page-filter__datepicker">
                        <DatePicker
                            readOnly={true}
                            dateFormat="D MMMM YYYY"
                            placeholderText="6 июня 2016"
                            selected={this.state.filter.date1}
                            onChange={ (value) => this.filterDate("date1", value)}
                            maxDate={this.state.filter.date2}
                            selectsStart
                            locale='ru-ru'
                            isClearable={false}
                            startDate={this.state.filter.date1}
                            endDate={this.state.filter.date2}/>
                        <span>до</span>
                        <DatePicker
                            readOnly={true}
                            dateFormat="D MMMM YYYY"
                            placeholderText="18 июля 2016"
                            selected={this.state.filter.date2}
                            onChange={ (value) => this.filterDate("date2", value)}
                            minDate={this.state.filter.date1}
                            selectsEnd
                            locale='ru-ru'
                            isClearable={false}
                            startDate={this.state.filter.date1}
                            endDate={this.state.filter.date2}/>
                    </div>
                </div>

                <div className="page-filter__row nolabel">
                    <div className="btn btn__primary" onClick={ReportsAppsStore.getData}>Применить</div>
                </div>
            </div>
        );
    }
})
