import * as React from 'react';

import {Router, Link, browserHistory} from 'react-router'

export const Breadcrumb = React.createClass({
    componentDidMount() {
    },
    render() {
        var breadcrumb = this.props.route.map(function(r, index) {
            return (
                <Link key={index} to={r[0]}>{r[1]}</Link>
            );
        });
        return (
            <div className="page-bar">
                <div className="page-breadcrumb">{breadcrumb}</div>
            </div>
        );
    }
});
