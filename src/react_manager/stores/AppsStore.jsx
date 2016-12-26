import { ApplicationStore } from './ApplicationStore.jsx';
var moment = require('moment');


export const AppsStore = {
    events:{
        items:{
            updated: "appsUpdate"
        }
    },
    items: [],
    getById(id){
        return this.items.filter(function(app) {
            return app.id == id
        })[0];
    },
    getList(){
        $.ajax({
            url: 'http://api.dreel.ru/app/list',
            type: 'POST',
            dataType: 'json',
            data: { access_token: ApplicationStore.token()}
        })
        .done(function(response) {
            AppsStore.items = response.items;
            AppsStore.trigger(AppsStore.events.items.updated);
        })
    },
}

MicroEvent.mixin( AppsStore );
