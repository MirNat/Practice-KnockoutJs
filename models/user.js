define(['js/knockout-3.3.0'], function (ko) {
    'use strict';

    function User(params) {
        this.id = ko.observable(params.id);
        this.name = ko.observable(params.name);
        this.password = ko.observable(params.password);
        this.publicRoomViewModels = ko.observableArray(params.publicRoomViewModels);
        this.privateRoomViewModels = ko.observableArray(params.privateRoomViewModels);
        this.isAuthorized = ko.observable(params.isAuthorized);
    };

    return User;
});
