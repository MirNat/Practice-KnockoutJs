define(function () {
    'use strict';

    (function () {
        Array.prototype.create = function (item) {
            this.push(item);//return
        }

        Array.prototype.createEntities = function (itemsToCreate) {
            this.concat(itemsToCreate);
        }

        Array.prototype.deleteById = function (itemId) {
             this.filter(function (element, i) {
                return element.id !== itemId;
            });
        }

        Array.prototype.update = function (item) {
            this.deleteById(item.id);
            this.create(item);
            //return this;
        }

        Array.prototype.getAll = function () {
            return this;
        }

        Array.prototype.getById = function (itemId) {
            for (var i = 0; i < items.length; i++) {
                if (this[i].id == itemId) {
                    return this[i];
                }
            }
        }

        alert('I can everything');
    })();
});