'use strict';

var date;

module.exports = function () {
    return {
        get: function () {
            return date ? date : new Date();
        },
        set: function (_date) {
            date = _date;
        }
    };
};
