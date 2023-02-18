const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    }, {
    timestamps: true
}
)

//model - model is a js object helps to interact with database
let StudentModel = mongoose.model("student", StudentSchema);

module.exports = StudentModel;