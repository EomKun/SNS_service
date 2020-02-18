const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);

// model을 만들때 자동으로 id값을 생성함
// 그리고 이 밑에서 테이블간의 관계를 자동으로 지정함
// 관계를 알아서 설정해 줌

// 1 : n
db.User.hasMany(db.Post);     
db.Post.belongsTo(db.User);

// n : n
db.Post.belongsToMany(db.Hashtag, { through: "postHashtag" });
db.Hashtag.belongsToMany(db.Post, { through: "postHashtag" });
db.User.belongsToMany(db.User, {
  foreignKey: "following_id",
  as: "Followers",
  through: "Follow",    // table 명
});
db.User.belongsToMany(db.User, {
  foreignKey: "follower_id",
  as: "Followings",
  through: "Follow",
});

module.exports = db;
