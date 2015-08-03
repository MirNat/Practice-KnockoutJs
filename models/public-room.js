define(['js/knockout-3.3.0'], function (ko) {
    'use strict';

    function PublicRoom(params) {
        this.id = ko.observable(params.id);
        this.users = ko.observableArray(params.users);
        this.messages = ko.observableArray(params.messages);
        this.name = ko.observable(params.name);
    };

    return PublicRoom;
});