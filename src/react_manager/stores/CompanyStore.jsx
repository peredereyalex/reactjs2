import { ApplicationStore } from "./ApplicationStore.jsx";

export const CompanyStore = {
    events:{
        info:{
            updated: "companyInviteUpdate"
        }
    },
    inviteInfo:{
        users: [],
        magic_link: ""
    },
    getInviteInfo(){
        $.ajax({
            url: 'http://api.dreel.ru/company/inviteinfo',
            type: 'POST',
            dataType: 'json',
            data: {access_token: ApplicationStore.token()}
        })
        .done(function(result) {
            CompanyStore.inviteInfo.users = result.users;
            CompanyStore.inviteInfo.magic_link = result.magic_link;
            CompanyStore.trigger(CompanyStore.events.info.updated);
        });
    },
    inviteUser(email){
        $.ajax({
            url: 'http://api.dreel.ru/company/invite',
            type: 'POST',
            dataType: 'json',
            data: {
                access_token: ApplicationStore.token(),
                email: email
            }
        })
        .done(function() {
            CompanyStore.getInviteInfo();
        });
    }
}
MicroEvent.mixin( CompanyStore );
