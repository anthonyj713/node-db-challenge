const db = require('../data/dbConnection.js');

module.exports = {
    find,
    findById,
    findTasks,
    findResources,
    add
};

function find(){
    return db('projects')
};

function findById(id){
    return db('projects')
    .where('id', id)
    .first();
};

function findTasks(id){
    return db('projects')
    .join('tasks', 'projects.id', '=', 'tasks.project_id')
    .select('projects.name', 'projects.description', 'tasks')
    .where('project_id', id)
};

function findResources(id){
    return db('projects')
    .join('projects_resources', 'projects.id', '=', 'resources.id')
}