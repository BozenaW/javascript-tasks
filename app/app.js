'use strict';

var Promise = require('bluebird');

module.exports = function (db)
{

    function getEquipmentById(id)
    {
        return new Promise(function (resolve, reject)
        {
            db.get('equipment', id, function (error, data)
            {
                if (!data) {
                    reject(new Error('No equipment found with id: ' + id));
                } else {
                    resolve(data);
                }
            });
        });
    }

    function getOwnerById(id)
    {
        return new Promise(function (resolve, reject)
        {
            db.get('owner', id, function (error, data)
            {
                if (!data) {
                    reject(new Error('No owner found with id: ' + id));
                } else {
                    resolve(data);
                }
            });
        });
    }

    function getOwnerNameByEquipmentId(id)
    {
        return getEquipmentById(id).then(function (equipment)
        {
            return getOwnerById(equipment.owner).then(function (owner)
            {
                return owner.name;
            });
        });
    }

    return {
        getOwnerNameByEquipmentId: getOwnerNameByEquipmentId,
        getEquipmentById: getEquipmentById,
        getOwnerById: getOwnerById
    };
};
