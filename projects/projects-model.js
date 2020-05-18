const db = require('../data/dbConnection.js');

module.exports = {
    find,
    findById,
    findTasks,
    // findResources,
    // findProjectResources,
    add, 
    addTask,
    addResource,
    // addProjectResources
};

function find(){
    return db('projects')
};

function findById(id){
    return db('projects')
    .where('id', id)
    .first();
};

function findTaskId(id){
    return db('tasks')
    .where('id', id)
    .first();
};

function findResourceId(id){
    return db('resources')
    .where('id', id)
    .first();
};

function findTasks(id){
    return db('tasks')
    .join('projects', 'projects.id', '=', 'tasks.projects_id')
    .select('projects.name', 'projects.description', 'tasks.id','tasks.description', 'tasks.notes')
    .where('projects_id', id)
};

// function findResources(id){
//     return db('project_resources')
//     .join('projects', 'projects.id', '=', 'project_resources.projects_id')
//     .join('resources', 'resources.id', '=', 'project_resources.resources_id')
//     .select('resources.name', 'resources.description')
//     .where('project_resources.projects_id', id)
// };

// function findProjectResources(id){
//     return db('resources as r')
//     .join('project_resources as pr', 'r.id', 'pr.resources_id')
//     .join('projects as p', 'pr.projects_id', 'p.id')
//     .select('pr.projects_id', 'r.name', 'p.name', 'r.description')
//     .where('r.id', id)
// }

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

function addResource(resources){
    return db('resources as r')
    .join('project_resources as pr', 'r.id', 'pr.resources_id')
    .join('projects as p', 'pr.projects_id', 'p.id')
    .insert(resources, 'id')
    .then((ids) => {
        return findResourceId(ids[0]);
        });
    };

