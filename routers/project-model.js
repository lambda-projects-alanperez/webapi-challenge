const express = require('express')
const router = express.Router();
const db = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    db.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err=>{
        res.status(500).json({error: 'unable to retrieve information '})
    })
})


router.get('/:id', (req, res) => {
    const projectId = req.params.id;
    db.get(projectId)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err=>{
        res.status(500).json({error: 'id unavailable'})
    })
})

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;
    db.getProjectActions(projectId)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({error: 'project id unavailable'})
    })
})


router.post('/', (req, res) => {
    let newProject = {
        name: req.body.name, 
        description: req.body.description, 
        completed: false, 
    }

    db.insert(newProject)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err=>{
        res.status(404).json({error: 'unable to add project'})
    })
})

router.delete('/:id', (req, res) => {
    let projectId = req.params.id;

    db.remove(projectId)
    .then(project=> {
        res.status(201).json(project)
    })
    .catch(err=>{
        res.status(404).json({error: 'id unavailable'})
    })
})


router.put('/:id', (req, res) => {
    let projectId = req.params.id;
    let changes = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
    }

    db.update(projectId, changes)
        .then(project=> {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(404).json({error: 'project id unavailable'})
        })
})

module.exports = router;