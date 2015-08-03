define(function () {
    'use strict';

    function repository() {
        var items = [];
        var TimeInterval = 1000;

        this.create = function (item, callbackFunction, callbackError) {
            items.push(item);
            setTimeout(function () {
                try {
                    callbackFunction(true);
                } catch (exception) {
                    callbackError();
                }
            }, TimeInterval);
        }

        this.createEntities = function (itemsToCreate, callbackFunction, callbackError) {
            items = items.concat(itemsToCreate);
            setTimeout(function () {
                try {
                    callbackFunction(true);
                } catch (exception) {
                    callbackError();
                }
            }, TimeInterval);
        }

        this.update = function (item, callbackFunction, callbackError) {
            this.deleteById(item.id);
            this.create(item);
            setTimeout(function () {
                try {
                    callbackFunction(item);
                } catch (exception) {
                    callbackError();
                }
            }, TimeInterval);
        }

        this.deleteById = function (itemId, callbackFunction, callbackError) {
            items = items.filter(function (element, i) {
                return element.id !== itemId;
            });
            setTimeout(function () {
                try {
                    callbackFunction(true);
                } catch (exception) {
                    callbackError();
                }
            }, TimeInterval);
        }

        this.getAll = function () {
            return items;
        }

        this.getById = function (itemId) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id == itemId) {
                    return items[i];
                }
            }
        }
    }

    return repository;

});