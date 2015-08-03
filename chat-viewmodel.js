define(['js/knockout-3.3.0', 'server', 'models/user', 'viewmodels/room-viewmodel'], function (ko, server, User, RoomViewModel) {
    'use strict';

    //ko.components.register('app-component', {require: 'models/user'});

    function ChatViewModel() {
        var self = this;
        self.wrongAuthorized = ko.observable(false);
        self.selectedRoomViewModel = {id: ko.observable(0), name: ko.observable('')};//ko.observable({});
        self.isPublicRoom = ko.observable(undefined);
        self.messages = ko.observableArray([]);
        self.newMessageText = ko.observable('');
        self.isErrorShowSelectedRoom = ko.observable(false);
        self.allUsers = ko.observableArray([]);
        self.user = new User({name: 'Admin', password: '12345', isAuthorized: false, id: 0});

        self.authorize = function () {
            server.authorize(self.user.name(), self.user.password(), self.onAuthorize, self.onAuthorizeError);
        }

        self.onAuthorize = function (userFromRepository) {
            if (userFromRepository) {
                self.user.id(userFromRepository.id);
                self.user.publicRoomViewModels(userFromRepository.publicRoomViewModels);
                self.user.privateRoomViewModels(userFromRepository.privateRoomViewModels);
                self.user.isAuthorized(true);
                server.getAllUsers(self.onGetAllUsers, self.onGetAllUsersError);
            }
            self.wrongAuthorized(!self.user.isAuthorized());
        }

        self.onAuthorizeError = function () {
            self.wrongAuthorized(true);
        }

        self.onGetAllUsers = function (usersFromRepository) {
            self.allUsers(usersFromRepository);
        }

        self.onGetAllUsersError = function () {
            console.log('Exception happened in getting all users list.');
        }

        self.onGetPublicRoomModel = function (publicRoomModel) {
            self.messages(publicRoomModel.messages.slice(0));
        }

        self.onGetPublicRoomModelError = function () {
            console.log('Error getting public room model.');
        }

        self.showSelectedPublicRoom = function (selectedPublicRoom) {
            server.getPublicRoomModel(selectedPublicRoom.id, self.onGetPublicRoomModel, self.onGetPublicRoomModelError);
            self.selectedRoomViewModel.name(selectedPublicRoom.name);
            self.selectedRoomViewModel.id(selectedPublicRoom.id);
            self.isPublicRoom(true);
        }

        self.onGetPrivateRoomModel = function (privateRoomModel) {
            self.messages(privateRoomModel.messages.slice(0));
        }

        self.onGetPrivateRoomModelError = function () {
            console.log('Error getting private room model.');
        }

        self.showSelectedPrivateRoom = function (selectedPrivateRoom) {
            server.getPrivateRoomModel(selectedPrivateRoom.id, self.onGetPrivateRoomModel, self.onGetPrivateRoomModelError);
            self.selectedRoomViewModel.name(selectedPrivateRoom.name);
            self.selectedRoomViewModel.id(selectedPrivateRoom.id);
            self.isPublicRoom(false);
        }

        self.errorShowSelectedRoom = function () {
            self.isErrorShowSelectedRoom(true);
        }

        self.sendMessage = function () {
            if (self.newMessageText) {
                server.sendMessage(self.newMessageText(), self.user.id(), self.user.name(), self.selectedRoomViewModel.id(), self.isPublicRoom(), self.onSendMessage, self.onSendMessageError);
            }
        }

        self.onSendMessage = function (message) {
            self.messages.push(message);
            self.newMessageText('');
        }

        self.onSendMessageError = function () {
            console.log('Error sending of message.');
        }

        /*
         (callbackShowSelectedInChat, callbackError) {
         //server.selectPublicRoom(this.id, callbackShowSelectedInChat, callbackError);
         if(callbackShowSelectedInChat && callbackError)alert('here2');
         }*/
    }

    ko.applyBindings(new ChatViewModel());
});