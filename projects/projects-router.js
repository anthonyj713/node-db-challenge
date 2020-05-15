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

router.get('/tasks', (req, res) => {
  
});

router.get('/resources', (req, res) => {

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

router.post('/tasks', (req, res) => {

});

router.post('/resources', (req, res) => {

});

module.exports = router;