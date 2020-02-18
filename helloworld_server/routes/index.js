const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ ip: "111.111.111.111" });
});


module.exports = router;