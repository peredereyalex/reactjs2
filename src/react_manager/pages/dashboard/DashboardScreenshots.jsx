import * as React from 'react';
import OwlCarousel from 'react-owl-carousel';
import {ApplicationStore} from '../../stores/ApplicationStore.jsx';

var moment = require('moment');

window.dashboard.slider = null;

export const DashboardScreenshots = React.createClass({
    getInitialState() {
        return {items: []};
    },
    componentDidMount() {
        $.ajax({
            url: 'http://api.dreel.ru/dashboard/screenshots/',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token()
            }
        }).done(function(response) {
            this.sliderUpdate(response.items);
        }.bind(this))
    },
    sliderUpdate(items) {
        this.setState({items: items});
        window.dashboard.slider = new Swiper('.x-screenshots__slider', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 30,
            freeMode: true,
            nextButton: '.x-screenshots__right',
            prevButton: '.x-screenshots__left',
        });
    },
    componentWillUnmount() {

    },
    render() {

        console.log(this.state);
        var screenshots = this.state.items.map(function(item) {
            return (
                <div key={item.id} className="swiper-slide x-screenshots__item">
                    <div className="x-screenshots__image" style={{backgroundImage: 'url(' + item.screenshot + ')'}}></div>
                    <div className="x-screenshots__desc">{item.user_name}</div>
                    <div className="x-screenshots__desc">{moment.unix(item.timestamp).format('H:mm')}</div>
                </div>
            );
        });
        return (
            <div className="x-screenshots x-page__preview">
                <div className="x-screenshots__title">Последние скриншоты</div>
                <div className="x-screenshots__wrapper">
                    <div className="x-screenshots__left"></div>
                    <div className="x-screenshots__right"></div>
                    <div className="x-screenshots__slider swiper-container">
                        <div className="swiper-wrapper">
                            {screenshots}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
