const db = require('../services/users-db');

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const saltQuery = db.query(query, email)[0];

  console.log(query, saltQuery);

  let salt;

  if (saltQuery) {
    salt = saltQuery[value];
  }

  return salt;
}

module.exports = {
  getSalt,
};