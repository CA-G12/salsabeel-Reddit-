const { postQueries } = require('../database/Queries');

const allPosts = (req, res) => {
  postQueries.getAllPosts()
    .then((data) => res.json({ post: data.rows }))
    .catch((err) => res.json(err));
};
const getTrend = (req, res) => {
  postQueries.getTrending()
    .then((data) => res.json({ post: data.rows }))
    .catch((err) => res.json(err));
};
const getCategory = (req, res) => {
  postQueries.getPostByCategory(req.params.category)
    .then((data) => res.json({ post: data.rows }))
    .catch((err) => res.json(err));
};
const addPosts = (req, res) => {
  if (req.user) {
    const {
      content, title, category, imageUrl,
    } = req.body;
    const userId = req.user.data.id;
    postQueries.addPost({
      userId, content, title, category, imageUrl,
    }).then((data) => res.json(data.rows)).catch((err) => res.json(err));
  }
};

const deletePost = (req, res) => {
  if (req.user) {
    const { postId } = req.body;
    const userId = req.user.data.id;

    postQueries.deletePost({ postId, userId })
      .then((data) => res.json({ done: 'done' }))
      .catch((err) => res.json(err));
  }
};
module.exports = {
  allPosts, addPosts, deletePost, getTrend, getCategory,
};
