define(['../js/knockout-3.3.0.js', 'server', 'models/user'], function (ko, server, User) {
    'use strict';

    //ko.components.register('app-component', {require: 'models/user'});

    function ChatViewModel() {
        this.wrongAuthorized = ko.observable(false);
        this.allUsers = ko.observableArray([]);
        this.editedPublicRoom  = ko.observable({});
        this.selectedRoom = ko.observable({});
        this.user = new User({name: 'Admin', password: '12345', isAuthorized: false, id: 0});
        this.authorize = function () {
            var userFromRepositoty = server.authorize(this.user.name(), this.user.password());
            if (userFromRepositoty) {
                this.user.id(userFromRepositoty.id);
                this.user.publicRoomViewModels(userFromRepositoty.publicRoomViewModels);
                this.user.privateRoomViewModels(userFromRepositoty.privateRoomViewModels);
                this.user.isAuthorized(true);
                this.allUsers(server.getAllUsers());
            }

            this.wrongAuthorized(!this.user.isAuthorized());

            this.editPublicRoom()
            {
                var id  = $data.id;
            }

            this.callbackF
        }
        this.showSelectedRoom = function(selectedRoom){
            this.selectedRoom(selectedRoom);
        }

        this.onPublicRoomEdited
    }

    ko.applyBindings(new ChatViewModel());
});


