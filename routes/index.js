var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("hello son")
});

const userRouter = require("./user.api.js")
router.use('/user', userRouter)

const taskRouter = require('./task.api.js')
router.use('/task', taskRouter)


module.exports = router;
