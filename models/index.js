const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');


Post.belongsTo(User);

Comment.belongsTo(User);

Comment.belongsTo(Post);

Post.hasMany(Comment);


module.exports = { Comment, Post, User };