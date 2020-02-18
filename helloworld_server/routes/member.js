const express = require("express");
const con = require("./mysql_con");
const User = require('../models').User;
const router = express.Router();

// 회원가입
router.post("/insert", async (req,res) => {
    const nick = req.body.name;
    const email = req.body.email;
    const password = req.body.pw;
    const comment = req.body.comments;

    try {
        const result = await User.create({
            email,
            nick,
            password,
        });
        
        res.json({ msg: result.nick });
    } catch (err) {
        res.json({ msg: false });
    }
});

// 로그인
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.pw;

    try {
        const result = await User.findOne({ where : { email, password }});
        res.json({ nick: result.nick, id: result.id });
    } catch (err) {
        console.log(err.message);
        res.json({ nick: false });
    }

    /*
    const sql = `SELECT * FROM members WHERE email=? AND pw=?`;

    con.query(sql, [req.body.email, req.body.pw], (err, result) => {
        if(err){
            console.log(err.message);
        } else {
            if(result.length){
                req.session.email = result[0].email;
                res.json({ msg: result[0].email });
            }
            else
                res.json({ msg: false });
        }
    });
    */
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ msg: true });
    });
});

module.exports = router;