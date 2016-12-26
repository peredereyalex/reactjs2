import { ApplicationStore } from '../../../stores/ApplicationStore.jsx';

var moment = require('moment');

export const ReportsAppsStore = {
    events:{
        data:{
            updated: "ReportsAppsStoreappsUpdate"
        }
    },
    data: {
        users: [],
        apps: [],
    },
    filter: {
        users: [],
        apps: [],
        date1: null,
        date2: null
    },
    chart: {
        headers:[],
        data: []
    },
    getUser(id){
        return this.data.users.filter(function(object) {
            return parseInt(object.id) == parseInt(id)
        })[0];
    },
    getApp(id){
        return this.data.apps.filter(function(object) {
            return parseInt(object.id) == parseInt(id)
        })[0];
    },
    getInfo(){
        $.ajax({
            url: 'http://api.dreel.ru/reports/appsinfo/',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token(),
            }
        })
        .done(function(response) {
            ReportsAppsStore.filter = response.info.filter;
            ReportsAppsStore.data.users = response.info.users;
            ReportsAppsStore.data.apps = response.info.apps;

            ReportsAppsStore.filter.date1 = moment.unix(response.info.filter.date1);
            ReportsAppsStore.filter.date2 = moment.unix(response.info.filter.date2);

            ReportsAppsStore.trigger(ReportsAppsStore.events.data.updated);
            ReportsAppsStore.getData();
        })
    },
    getData(){
        $.ajax({
            url: 'http://api.dreel.ru/reports/apps/',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token(),
                filter: {
                    users: ReportsAppsStore.filter.users,
                    apps: ReportsAppsStore.filter.apps,
                    date1: ReportsAppsStore.filter.date1.unix(),
                    date2: ReportsAppsStore.filter.date2.unix(),
                }
            }
        })
        .done(function(response) {
            ReportsAppsStore.chart = response.chart;
            ReportsAppsStore.trigger(ReportsAppsStore.events.data.updated);
        })
    }
}

MicroEvent.mixin( ReportsAppsStore );
