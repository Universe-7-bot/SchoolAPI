const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/allTeacher", (req, res) => {
    res.send("this is all teacher information");
})

router.get("searchByEmail", (req, res) => {
    res.send("ghi@gmail.com");
})

router.post("/addNew", (req, res) => {
    res.send("sohan");
})

module.exports = router;