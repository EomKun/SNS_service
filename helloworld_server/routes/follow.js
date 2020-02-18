const express = require("express");
const User = require('../models').User;
const router = express.Router();

// 팔로우 테이블 요청
router.post("/render", async (req, res) => {
    try {
        const id = req.body.id;
        const result = await User.findOne({
            attributes: ["id", "nick"],
        });

        const follower_result_t = await result.getFollowers({
            where: { id },
            attributes: ["id", "nick"]
        });
        const follower_result = await User.findOne({
            where: { id },
            attributes: ["nick"]
        });
        const following_result_t = await result.getFollowings({
            where: { id },
            attributes: ["id", "nick"]
        });

        console.log(follower_result);
        console.log(following_result);

        res.json({
            msg: true, 
            follower_result,
            following_result,
        });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

// 팔로우 요청
router.post("/", async (req, res) => {
    try {
        follower_id = req.body.follower_id;
        id = req.body.following_id;

        const result = await User.findOne({
            where: { id }
        });

        result.addFollowers(follower_id);
        
        res.json({ msg: true, result });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

module.exports = router;