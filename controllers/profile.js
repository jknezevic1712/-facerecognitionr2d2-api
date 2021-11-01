const handleProfileGet = (req, res, db) => {
  const { id } = req.params;

  // In where statement you can just write where{{ id }} instead of where{{ id: id }} because they're both same

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User not found!");
      }
    })
    .catch((err) => res.status(400).json("Error fetching user."));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
