import * as React from 'react';

import { ProjectsFilter } from './ProjectsFilter.jsx';
import { ProjectsList } from './ProjectsList.jsx';
import { Breadcrumb } from '../../components/Breadcrumb.jsx';

export const Projects = React.createClass({

    render() {
        var breadcrumb = [
            ['/dashboard','Рабочий стол'],
            ['/projects', 'Проекты']
        ];

        return (
            <div className="page">
                <Breadcrumb route={breadcrumb}/>
                <ProjectsFilter/>
                <div className="page-content">
                    <ProjectsList/>
                </div>
            </div>
        );
    }
})
