import * as React from 'react';

import { Breadcrumb } from "../../components/Breadcrumb.jsx";

import { ChartActivity } from './ChartActivity.jsx';

export const User = React.createClass({
    render() {
        var breadcrumb = [
            ['/dashboard','Рабочий стол'],
            ['/company/invite', 'Список пользователей']
        ];

        return (
            <div className="page">
                <Breadcrumb route={breadcrumb}/>
                <div className="page-content">
                    <div className="x-columns">
                        <div className="x-column x-8">
                            <ChartActivity userid={this.props.params.userid}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
