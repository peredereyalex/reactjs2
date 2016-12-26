import { ApplicationStore } from '../../stores/ApplicationStore.jsx';

export const DashboardStore = {
    events:{
        notifications:{
            updated: "DashboardStorenotificationsUpdate"
        }
    },
    notifications: [],
    getNotifications(){
        $.ajax({
            url: 'http://api.dreel.ru/dashboard/notifications',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token()
            }
        })
        .done(function(response) {
            DashboardStore.notifications = response.items;
            DashboardStore.trigger(DashboardStore.events.notifications.updated);
        });
    },
}

MicroEvent.mixin( DashboardStore );
