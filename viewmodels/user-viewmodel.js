define(['js/knockout-3.3.0'], function (ko) {
    'use strict';

    function UserViewModel(params) {
        this.id = ko.observable(params.id);
        this.name = ko.observable(params.name);
    }

    return UserViewModel;
});
