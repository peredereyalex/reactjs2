import * as React from 'react';

import { ReportsAppsFilter } from "./ReportsAppsFilter.jsx";
import { ReportsAppsTable } from "./ReportsAppsTable.jsx";
import { ReportsAppsPie } from "./ReportsAppsPie.jsx";
import { ReportsAppsBars } from "./ReportsAppsBars.jsx";

export const ReportsApps = React.createClass({
    render() {
        return (
            <div className="page">
                <ReportsAppsFilter/>
                <div className="page-content">
                    <div className="x-columns">
                        <div className="x-column x-8">
                            <ReportsAppsTable/>
                        </div>
                        <div className="x-column x-4">
                            <ReportsAppsPie/>
                        </div>
                    </div>
                    <div className="x-columns">
                        <div className="x-column x-12">
                            <ReportsAppsBars/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
