import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

import { Frame } from './components/Frame.jsx';

import { Dashboard } from './pages/dashboard/Dashboard.jsx';

import { CompanyInvite } from './pages/company/invite/CompanyInvite.jsx';

import { Users } from './pages/users/Users.jsx';
import { User } from './pages/user/User.jsx';

import { Tasks } from './pages/tasks/Tasks.jsx';
import { TaskEdit } from './pages/task/edit/TaskEdit.jsx';

import { Projects } from './pages/projects/Projects.jsx';
import { ProjectEdit } from './pages/project/edit/ProjectEdit.jsx';
import { ProjectDetail } from './pages/project/detail/ProjectDetail.jsx';

import { Screenshots } from './pages/screenshots/Screenshots.jsx';

import { ReportsApps } from './pages/reports/apps/ReportsApps.jsx';
import { ReportsUser } from './pages/reports/user/ReportsUser.jsx';
import { ReportsProject } from './pages/reports/project/ReportsProject.jsx';

import { SettingsApps } from './pages/settings/apps/SettingsApps.jsx';

require('../scss/global.scss');

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path="/" component={ Frame }>
            <Route path="dashboard" component={ Dashboard }/>

            <Route path="company/invite" component={ CompanyInvite }/>

            <Route path="users" component={ Users }/>
            <Route path="user/:userid" component={ User }/>


            <Route path="tasks" component={ Tasks }/>
            <Route path="task/edit/:taskId" component={ TaskEdit }/>
            <Route path="task/edit/:taskId/:projectId" component={ TaskEdit }/>

            <Route path="projects" component={ Projects }/>
            <Route path="project/edit/:projectId" component={ ProjectEdit }/>
            <Route path="project/detail/:projectId" component={ ProjectDetail } />

            <Route path="screenshots" component={ Screenshots }/>

            <Route path="reports/apps" component={ ReportsApps }/>
            <Route path="reports/user" component={ ReportsUser }/>
            <Route path="reports/project" component={ ReportsProject }/>

            <Route path="settings/apps" component={ SettingsApps }/>

            <Route path="*" component={ Dashboard } />

        }
        </Route>
    </Router>,
    document.getElementById("app")
);
