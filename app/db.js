'use strict';

var _ = require('lodash');

module.exports = function () {
    var storage = {};
    var idSequence = 1;
    return {
        save: function (item) {
            item = _.cloneDeep(item);
            if (!item.id) {
                item.id = idSequence++;
            }
            storage[item.id] = item;
            return item;
        },
        getAll: function () {
            return _.values(storage);
        }
    };
};
