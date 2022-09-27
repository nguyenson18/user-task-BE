const {sendResponse, AppError} = require('../helpers/utils')

const Task = require('../models/task')
const User = require('../models/user')
const taskControllers = {}

taskControllers.getAllTask=async(req, res, next)=>{
    try {
        const filterTask = {}

        const listTask = await Task.find(filterTask).populate("referenceTo")

        sendResponse(res,200,true,{data:listTask},null,"Found List Task success")
    } catch (error) {
        next(error)
    }
}

taskControllers.createTask=async(req,res,next)=>{
    try {
        const data =req.body

        if(!data || Object.keys(data).length===0) throw new AppError(400,"Bad Request","Create Task Error")
        const updateTask = await Task.create(data)
        sendResponse(res,200,true,{data:updateTask},null,"Create Task success")
    } catch (error) {
        next(error)
    }
}

taskControllers.addTaskReference=async(req,res,next)=>{
    try {
        const {targetName} = req.params
        console.log(targetName)
        const {ref} = req.body
        const options = {new: true}

        let found = await Task.findOne({name: targetName}, options)
        const refFound = await User.findById(ref)
        if(!found.status){
            found.status = "pending"
        }
        console.log(found.status = refFound.role)
        found.referenceTo = refFound

        found = await found.save()
        sendResponse(res,200,true,{data:found},null,"Add reference success")
    } catch (error) {
        next(error)
    }
}

taskControllers.updateTask=async(req,res,next)=>{
    try {
        const {id}= req.params
        const data= req.body
        const options = {new:true}

        const updateTask = await Task.findByIdAndUpdate(id, data, options)
        sendResponse(res,200,true,{data:updateTask},null,"Update Task success")
    } catch (error) {
        next(error)
    }
}


module.exports = taskControllers
