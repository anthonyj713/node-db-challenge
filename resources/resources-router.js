const express = require('express');

const Resources = require('./resources-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.findResources()
    .then(resources => {
        res.json(resources)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message:'Failed to retrieve resources'
        });
    });
});

router.post('/', (req,res) => {
    const resourceData = req.body;
    Resources.addResource(resourceData)
    .then(resource => {
        res.status(201).json(resource);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create new resource'
        });
    });
});

module.exports = router;