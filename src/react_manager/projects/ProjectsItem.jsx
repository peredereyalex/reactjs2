import * as React from 'react';
import { Link }from 'react-router';

import { ProjectsStore } from '../../stores/ProjectsStore.jsx';

export var ProjectsItem = React.createClass({
    render() {
        return (
            <div className="projects-item">
                <div className="projects-item__title">
                    <div className="projects-item__name">
                        <Link key={this.props.project.id} to={`/project/detail/${this.props.project.id}`}>
                            {this.props.project.name}
                        </Link>
                    </div>
                    <div className="projects-item__btns">
                        <Link to={"/project/edit/"+this.props.project.id} className="projects-item__btn">
                            <i className="mdi mdi-24">mode_edit</i>
                        </Link>
                        <div className="projects-item__btn" onClick={ (e) => ProjectsStore.switchStatus(this.props.project.id) }>
                            <i className="mdi mdi-24">{(this.props.project.status == "archive") ? "refresh" : "delete"}</i>
                        </div>
                    </div>
                </div>
                <div className="projects-item__body" style={{background: this.props.project.color}}>
                    <div className="projects-item__desc">
                        <label>Активные задачи</label>
                        <span><i className="mdi">assignment</i>{this.props.project.tasks}</span>
                    </div>
                    <div className="projects-item__desc">
                        <label>Сотрудники</label>
                        <span><i className="mdi">person</i>{this.props.project.team}</span>
                    </div>
                    <div className="projects-item__desc">
                        <label>Потраченные часы</label>
                        <span><i className="mdi">timer</i>{this.props.project.time}</span>
                    </div>
                </div>
            </div>
        );
    }
})
