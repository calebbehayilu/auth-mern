module.exports = function (req, res, next) {
  console.log(req.user);
  if (req.user.role !== "admin") return res.status(403).send("Access Denied");

  next();
};
