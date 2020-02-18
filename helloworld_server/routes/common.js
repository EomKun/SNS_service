const Post = require("../models").Post;

async function getAllPosts() {
    try {
        const result = await Post.findAll({
            include: {
                model: User,
                attributes: ["id", "nick"],
            },
            order: [["createdAt", "DESC"]],
        });

        console.log(result);
        return result;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

module.exports = getAllPosts;