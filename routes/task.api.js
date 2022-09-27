const express = require('express')
const router = express.Router()

const { getAllTask, createTask, addTaskReference, updateTask} = require("../controllers.js/task.controllers")

router.get('/', getAllTask)

router.post('/',createTask)

router.put('/:id', updateTask)

router.put('/:targetName', addTaskReference)

module.exports =router