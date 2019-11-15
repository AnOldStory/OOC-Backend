/* Json Web Token */
var config = require("../config/config");
var jwt = require("jsonwebtoken");

exports.encryption = (value, callback) => {
  jwt.sign(
    value,
    config.SESSION_SECRET,
    { expiresIn: 60 * 60 },
    (err, token) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        return callback(null, token);
      }
    }
  );
};

exports.decryption = (token, callback) => {
  jwt.verify(token, config.SESSION_SECRET, (err, value) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, value);
    }
  });
};
