const bcrypt = require('bcrypt');

const db = require('./users-db');
const sanitizeInput = require('../utils/sanitize-input');
const saltGen = require('../utils/salt-gen');

function authUser(data) {
  const { email, password } = sanitizeInput(data);

  const salt = saltGen.getSalt(false, email);
  const passwordHash = bcrypt.hashSync(password, salt);

  const query = 'SELECT * FROM login_table where email=? and password=?';
  const queryResult = db.query(query, [email, passwordHash]);

  if (!queryResult[0]) {
    console.log(queryResult, email, password, passwordHash);

    const query2 = 'SELECT * FROM login_table where email=?';
    const queryResult2 = db.query(query2, [email]);

    console.log(queryResult2);

    return false;
  }

  return {
    email: queryResult[0].email,
  };
}

module.exports = {
  authUser,
};
