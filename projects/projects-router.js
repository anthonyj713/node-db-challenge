const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.find()
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve projects'
        });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.findById(id)
    .then(project => {
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({
                message: 'Could not find project with given id'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get project'
        });
    });
});

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.findTasks(id)
    .then(tasks => {
        if (tasks.length) {
            res.json(tasks);
        } else {
            res.status(404).json({
                message: 'Could not find tasks for given project'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to retrieve tasks"
        });
    });
});

router.get('/:id/resources', (req, res) => {

});

router.post('/', (req, res) => {
    const projectData = req.body;
    Projects.add(projectData)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create new project'
        });
    });
});

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    Projects.addTask(taskData)
    .then(task => {
        res.status(201).json(task);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create new task'
        });
    });
});

router.post('/resources', (req, res) => {

});

module.exports = router;