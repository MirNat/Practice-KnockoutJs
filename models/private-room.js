define(['js/knockout-3.3.0'], function (ko) {
    'use strict';

    function PrivateRoom(params) {
        this.id = ko.observable(params.id);
        this.user1Id = ko.observable(params.user1Id);
        this.user2Id = ko.observable(params.user2Id);
        this.messages = ko.observableArray(params.messages);
        this.name = ko.observable(params.name);
    };

    return PrivateRoom;
});