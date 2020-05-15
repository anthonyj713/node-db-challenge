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
    .join('tasks', 'projects.id', '=', 'tasks.projects_id')
    .select('projects.name', 'projects.description', 'tasks')
    .where('projects_id', id)
};

function findResources(id){
    return db('projects')
    .join('projects_resources', 'projects.id', '=', 'projects_resources.project_id')
    .join('resources', 'resources.id', '=', 'project_resources.resource_id')
    .where('resource_id', id)
};

function add(project){
    return db('projects')
    .insert(project, 'id')
    .then(ids => {
        return findById(ids[0])
    });
};