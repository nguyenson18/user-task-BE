const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        name: {type: String, require: true},
        role: { type: String,  enum: ['employee', 'manager'], default:"employee", require:true }
    },
    {
        timestamps: true,
    }
    
)

const User = mongoose.model("User", userSchema)
module.exports = User