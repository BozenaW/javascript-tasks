'use strict';

var Promise = require('bluebird');

module.exports = function (http)
{
    return {
        get: function (url)
        {
            return new Promise(function (resolve, reject)
            {
                http.get(url, function internalCallback(err, response)
                {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.body);
                    }
                });
            });
        }
    };
};
