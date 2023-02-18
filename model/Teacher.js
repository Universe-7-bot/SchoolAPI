const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
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
            type: Number,
            required: true,
            unique: true
        }
    }, {
    timestamps: true
}
)

//model -model is a js object helps to interact with database
let TeacherModel = mongoose.model("user", TeacherSchema);

module.exports = TeacherModel;