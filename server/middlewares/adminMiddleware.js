// module.exports = (req, res, next) => {
//   if ( req.user.role !== "admin") {
//     return next();
//   }
//   return res.status(403).json({ message: "Admin access denied" });
// };


module.exports = (req, res, next) => {
  console.log("USER ROLE 👉", req.user.role); // 👈 ADD
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
