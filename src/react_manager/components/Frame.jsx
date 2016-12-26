import * as React from 'react';
import { browserHistory } from 'react-router'

import { Header } from './Header.jsx';
import { Sidebar } from './Sidebar.jsx';

export const Frame = React.createClass({
    componentDidMount() {
        $(".x-loader").addClass('x-loader__end');
        setTimeout( function() { $(".x-loader").remove() } , 800);
        if(window.location.pathname=="/")
            browserHistory.push("/dashboard");
    },
    render() {
        return (
            <div className="main">
                <Header/>
                <Sidebar/>
                {this.props.children}
            </div>
        );
    }
})
