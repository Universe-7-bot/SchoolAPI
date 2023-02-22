const express = require("express");
const router = express.Router();
const Student = require("../model/Student.js");

router.use(express.json());

router.get("/allStudent", async (req, res) => {
    try {
        let studentData = await Student.find({});
        res.json({ studentData });
    } catch (err) {
        res.json({ message: err.message });
    }
})

router.post("/searchByEmail", async (req, res) => {
    let email = req.body.email;

    if (!email) {
        res.json({ message: "enter email" });
    }

    try {
        let student = await Student.find({ email }); //array of records
        if (student.length == 0) {
            return res.json({ message: "no student found with given email id" });
        } else {
            return res.json({ info: student[0] });
        }
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ message: "email already exists" });
        }
        res.json({ message: err.message });
    }

})

router.post("/addNew", async (req, res) => {
    let { firstName, lastName, email } = req.body; //firstName = req.body.firstName object destructuring
    if (!firstName || !lastName || !email) {
        return res.json({ message: "please enter all the fields" });
    }

    try {
        email = email.toLowerCase();
        let tempStudent = new Student({
            firstName, lastName, email
        })

        let savedStudent = await tempStudent.save();
        return res.json({ savedStudent });
    } catch (err) {
        return res.json({ message: err.message });
    }

})

router.post("/search", async (req, res) => {
    let query = req.body;
    console.log(query);
    try {
        let info = await Student.find(query);
        return res.json({ info });
    } catch (err) {
        return res.json({ message: err.message });
    }
})

router.get("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        await Student.findByIdAndDelete(id);
        return res.json({ message: "deleted successfully" });
        // res.redirect("127.0.0.1:5500/student.html");
    } catch (err) {
        return res.json({ message: err.message });
    }
})

router.post("/update/:id", async (req, res) => {
    let id = req.params.id;
    let { firstName, lastName, email } = req.body;

    try {
        await Student.findByIdAndUpdate(id, { firstName, lastName, email })
        // let data = await Student.findById(id)
        // return res.json({ message: data });
        return res.json({ message: "Updated successfully" });
    } catch (err) {
        return res.json({ message: err.message });
    }
})

module.exports = router;