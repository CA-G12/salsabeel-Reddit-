const { actionQueries } = require('../database/Queries');

const getUserAction = (req, res) => {
  if (req.user) {
    const { postId } = req.body;
    const userId = req.user.data.id;
    actionQueries.getUserActions({ postId, userId })
      .then((data) => res.json({ actions: data.rows }))
      .catch((err) => res.json({ err }));
  }
};
const updateLikeAc = (req, res) => {
  if (req.user) {
    const { postId, newLike } = req.body;
    const userId = req.user.data.id;
    const newRate = 0;
    actionQueries.getUserActions({ postId, userId })
      .then((data) => {
        if (data.rows.length >= 1) {
          return actionQueries.updateLike({ postId, userId, newLike });
        }
        return actionQueries.insertAction({
          postId, userId, newLike, newRate,
        });
      })
      .then((data) => res.json({ actions: data.rows }))
      .catch((err) => res.json({ err }));
  }
};
const updateRateAc = (req, res) => {
  if (req.user) {
    const { postId, newRate } = req.body;
    const userId = req.user.data.id;

    actionQueries.updateRate({ postId, userId, newRate })
      .then((data) => res.json({ actions: data.rows }))
      .catch((err) => res.json({ err }));
  }
};

module.exports = {
  getUserAction, updateLikeAc, updateRateAc,
};
