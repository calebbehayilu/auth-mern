module.exports = function (req, res, next) {
  console.log(req.user);
  if (req.user.role !== "job_seeker")
    return res.status(403).send("Access Denied");

  next();
};
