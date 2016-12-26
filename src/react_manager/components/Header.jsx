import * as React from 'react';
import {Router, Link, browserHistory} from 'react-router'


export const Header = React.createClass({
    getInitialState() {
        return {}
    },
    render() {
        return (
            <div className="header">
            
                {/* <div className="header-user">
                    <div className="header-user-photo">
                        <img src="http://keenthemes.com/preview/metronic/theme/assets/layouts/layout/img/avatar3_small.jpg"/>
                    </div>
                    <div className="header-user-login">rick@macho.su</div>
                </div> */}
            </div>
        );
    }
});
