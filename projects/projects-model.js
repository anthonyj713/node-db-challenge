const db = require('../data/dbConnection.js');

module.exports = {
    find,
    findById,
    findTasks,
    findResources,
    add, 
    addTask
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
    return db('tasks')
    .join('projects', 'projects.id', '=', 'tasks.projects_id')
    .select('projects.name', 'projects.description', 'tasks.id','tasks.description', 'tasks.notes')
    .where('projects_id', id)
};

function findTaskId(id){
    return db('tasks')
    .where('id', id)
    .first();
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

function addTask(task){
    return db('tasks')
    .insert(task, 'id')
    .then((ids) => {
        return findTaskId(ids[0]);
    });
};