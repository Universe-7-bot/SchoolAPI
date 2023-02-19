const express = require("express");
const app = express();
const studentRoute = require("./routes/student_route");
const teacherRoute = require("./routes/teacher_route");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

//connection established with database using mongoose module
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected with database");
}).catch((err) => {
    console.log(err);
})

//SOLID prenciples of OOPS
// database -> collections -> records
// excel -> sheets -> rows

//middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log("server is running on PORT:" + PORT);
})