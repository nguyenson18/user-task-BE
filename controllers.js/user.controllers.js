const {sendResponse, AppError} = require('../helpers/utils')

const User = require('../models/user.js')

const userController = {}

userController.createUser=async(req, res, next)=>{
    try {
        const data = req.body
        if(!data || Object.keys(data).length===0) throw new AppError(400, "Bad Request", "Create User Error")

        const created = await User.create(data)
        sendResponse(res,200,true,{data:created},null,"Create User Success")
    } catch (error) {
        next(error)
    }
}

userController.getAllUser=async(req, res, next)=>{
    const allowedFilter = [
        'name',
        'role'
    ]
    try {
        const {...filterQuery} =req.query
        const filterKeys = Object.keys(filterQuery);
        filterKeys.forEach((key) => {
            if (!allowedFilter.includes(key)) {
                const exception = new Error(`Query ${key} is not allowed`);
                exception.statusCode = 401;
                throw exception;
            }
            if (!filterQuery[key]) delete filterQuery[key];
        })
        console.log(filterKeys)
        const filter = {}
        const listUserFound = await User.find(filter)

        let result = []
        if(filterKeys.length){
           filterKeys.forEach((e)=>{
            if(e = 'name'){
                result = listUserFound.filter((n)=> n.name.includes(filterQuery[e]))
            }
            if(e = 'role'){
                result = listUserFound.filter((r)=> r.role.includes(filterQuery[e]))
            }
           })
        } else {
            result = listUserFound
        }

        sendResponse(res,200,true,{data:result},null,"Found list of User success")
    } catch (error) {
        next(error)
    }
}

userController.deleteUser=async(req, res, next)=>{
    try {
        const {id} = req.params
        const options = {new:true}

        const updateUser = await User.findByIdAndDelete(id,options)
        sendResponse(res,200,true,{data:updateUser},null,"Delete User Success")
    } catch (error) {
        next(error)
    }
}

userController.updateUser=async(req, res, next)=>{
    try {
        const{id}= req.params
        const data = req.body
        const options = {new:true}
        
        const updateUser = await User.findByIdAndUpdate(id, data, options)

        sendResponse(res,200,true,{data:updateUser},null,"Update User Success")
    } catch (error) {
        next(error)
    }
}

module.exports = userController