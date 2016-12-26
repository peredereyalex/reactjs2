import { ApplicationStore } from '../stores/ApplicationStore.jsx';
import { browserHistory } from 'react-router';

export const ProjectsStore = {
    events:{
        items:{
            updated: "TasksStoreitemsUpdated",
        },
    },
    filter:{
        name: "",
        status: "active"
    },
    items: [],
    getList(){
        $.ajax({
            url: 'http://api.dreel.ru/projects/',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token()
            }
        })
        .done(function(response) {
            ProjectsStore.items = response.items;
            ProjectsStore.trigger(ProjectsStore.events.items.updated);
        })
    },
    switchStatus(id){
        $.ajax({
            url: 'http://api.dreel.ru/projects/switchstatus',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token(),
                project_id: id
            }
        })
        .done(function(response) {
            ProjectsStore.getList();
        });
    },
}

MicroEvent.mixin( ProjectsStore );
