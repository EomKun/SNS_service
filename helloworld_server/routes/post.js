const express = require("express");
const User = require('../models').User;
const Post = require("../models").Post;
const Hashtag = require('../models').Hashtag;
const router = express.Router();

// 게시물 요청
router.post("/getAllPosts", async (req, res) => {
    try {
        const result = await Post.findAll({
            include: {
                model: User,
                attributes: ["id", "nick"],
            },
            order: [["createdAt", "DESC"]],
        });

        res.json({ msg: true, result });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

// 게시물 업로드
router.post("/upload", async (req,res) => {
    const userId = req.body.id;
    const content = req.body.content;
    const img = req.body.img;

    try {
        const result = await Post.create({
            userId,
            content,
            img,
        });
        
        // hashtag 뽑기
        // javascript에서의 정규식 패턴 /?????/g 이다
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if(hashtags) {
            const hash_result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({
                    where: { title: tag.slice(1).toLowerCase() },
                });
            }));
            
            result.addHashtags(hash_result.map((row) => {
                console.log(row[0]);
                return row[0];
            }));
        }
        
        res.json({ msg: true });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

module.exports = router;