'use strict';

var Promise = require('bluebird');

module.exports = function (db, collectionName, onData)
{
    var command = {convertToCapped: null, size: 100};
    command.convertToCapped = collectionName;
    return new Promise(function (resolve, reject)
    {
        db.command(command, function (err)
        {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }).delay(1000).then(function ()
    {
        return db.collection(collectionName).find({})
                .addCursorFlag('tailable', true)
                .addCursorFlag('awaitData', true)
                .addCursorFlag('noCursorTimeout', true)
                .on('data', onData);
    });
};
