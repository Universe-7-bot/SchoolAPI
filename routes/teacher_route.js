const express = require("express");
const router = express.Router();
const Teacher = require("../model/Teacher.js");

router.use(express.json());

router.get("/allTeacher", async (req, res) => {
    try {
        let teacherData = await Teacher.find({});
        res.json({ teacherData });
    } catch (err) {
        res.json({ message: err.message });
    }
})

router.get("/searchByEmail", (req, res) => {
    res.send("ghi@gmail.com");
})

router.post("/addNew", async (req, res) => {
    const { firstName, lastName, email } = req.body; //firstName = req.body.firstName object destructuring
    if (!firstName || !lastName || !email) {
        return res.json({ message: "please enter all the fields" });
    }

    try {
        email = email.toLowerCase();
        let tempTeacher = new Teacher({
            firstName, lastName, email
        })

        let savedTeacher = await tempTeacher.save();
        return res.json({ savedTeacher });
    } catch (err) {
        return res.json({ message: err.message });
    }

})

module.exports = router;