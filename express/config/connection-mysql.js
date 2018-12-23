const mysql = require('mysql');
const connections = {
  product: {
    host: '35.200.110.106',
    user: 'wc',
    password: '_123456789',
    database: 'rerp'
  },
  dev: {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'reactTestDB'
  }
};

process.env.NODE_ENV = 'product';
// if (process.env.USER === 'ec2-user') {
//   process.env.NODE_ENV = 'dev';
// }
const connection = mysql.createPool(connections[process.env.NODE_ENV]);

const error = function (req, res, err) {
  console.error('Start: err.sql');
  console.error(err.sql);
  console.error('End: err.sql');
  err.sql = undefined;
  res.status(500).send(err);
  return false;
};

module.exports = {
  db: connection,
  err: error
};