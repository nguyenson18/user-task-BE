const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name:{type:String, require: true},
    description:{type:String, require:true},
    status:{type:String, enum: ['pending', 'working', 'review', 'done', 'archive']},
    referenceTo:{type:mongoose.SchemaTypes.ObjectId, ref:"User"}
},
{
    timestamps: true,
}
) 

const Task = mongoose.model("Task", taskSchema);
module.exports = Task