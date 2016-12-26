import * as React from 'react';
import { Link }from 'react-router';

import { ProjectsStore } from '../../stores/ProjectsStore.jsx';
import { ProjectsItem } from './ProjectsItem.jsx';

export var ProjectsList = React.createClass({
    getInitialState() {
        return {
            projects: ProjectsStore.items,
            filter: ProjectsStore.filter
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ProjectsStore.bind(ProjectsStore.events.items.updated, this.dataUpdated);
        ProjectsStore.getList();
    },
    componentWillUnmount() {
        ProjectsStore.unbind(ProjectsStore.events.items.updated, this.dataUpdated);
    },
    dataUpdated() {
        this.setState({
            projects: ProjectsStore.items,
            filter: ProjectsStore.filter
        });
    },

    render() {
        var filter = this.state.filter;
        var projects = this.state.projects.filter(function(project) {
            return project.name.toLowerCase().includes(filter.name.toLowerCase()) && project.status == filter.status
        }).map(function(project) {
            return (
                <ProjectsItem key={project.id} project={project}/>
            );
        })
        
        return (
            <div className="projects">
                <Link className="projects-item" to="/project/edit/new">
                    <div className="projects-item__empty">
                        <div className="projects-item__addicon">
                            <i className="mdi">add</i>
                            <span>Добавить проект</span>
                        </div>
                    </div>
                </Link>
                {projects}
            </div>
        );
    }
})
