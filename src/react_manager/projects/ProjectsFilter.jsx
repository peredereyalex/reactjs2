import * as React from 'react';
import { Link }from 'react-router';

import { ProjectsStore } from '../../stores/ProjectsStore.jsx';

import { Input } from '../../components/Input.jsx';
import { Select } from '../../components/Select.jsx';

export var ProjectsFilter = React.createClass({
    getInitialState() {
        return({
            filter: ProjectsStore.filter,
            statuses: [
                {
                    id: 'active',
                    name: 'Активный',
                },
                {
                    id: 'archive',
                    name: 'В архиве'
                },
            ],
        })
    },
    filter: function(name, value) {
        ProjectsStore.filter[name] = value;
        ProjectsStore.trigger(ProjectsStore.events.items.updated);

        this.setState({filter: ProjectsStore.filter});
    },
    render() {
        return (
            <div className="page-filter">
                <div className="page-filter__title">Фильтр по проектам</div>
                <Input
                    class="page-filter__item"
                    label="Название проекта"
                    onChange={ (value) => this.filter("name", value) }
                    value={this.state.filter.name} />
                <Select
                    class="page-filter__item"
                    value={this.state.filter.status}
                    valueFromId
                    items={this.state.statuses}
                    onSelect={ (value) => this.filter("status", value) }
                    label="Статус проекта"/>
            </div>
        );
    }
})
