const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id ,roleID: user.roleID },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
};

exports.validatePassword = async (plaintextPassword, hash) => {
  try {
    const isMatch =  await bcrypt.compare(plaintextPassword, hash);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

exports.generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30m" });
};
