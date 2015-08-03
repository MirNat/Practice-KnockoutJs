define(['js/knockout-3.3.0'], function (ko) {
    'use strict';

    function Message(params) {
        this.id = ko.observable(params.id);
        this.authorId = ko.observable(params.authorId);
        this.authorName = ko.observable(params.authorName);
        this.publicRoomId = ko.observable(params.publicRoomId);
        this.privateRoomId = ko.observable(params.privateRoomId);
        this.date = ko.observable(params.date);
        this.text = ko.observable(params.text);
    };

    return Message;
});