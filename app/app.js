'use strict';

module.exports = function (a, b, c)
{
    return a().then(b, c);
};
