const db = require('../data/dbConnection.js');

module.exports = {
    findResources,
    findByResourceId,
    addResource
}

function findResources(){
    return db('resources')
};

function findByResourceId(id){
    return db('resources')
    .where('id', id)
    .first();
}

function addResource(resource){
    return db('resources')
    .insert(resource, 'id')
    .then(ids => {
        return findByResourceId(ids[0])
    });
};