const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "authorId",
  as: "posts",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

module.exports = {
  User,
  Post,
};