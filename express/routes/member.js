const express = require('express');
const router = express.Router();
/*const moment = require('moment');
const members = process.mockData.member*/
const connection = require('../config/connection-mysql');
const db = connection.db;
const dbError = connection.err;


/*router.post('/', (req, res) => {
  const member = req.body;
  member.createdDate = moment().format();
  members[members.length] = req.body;
  console.log(members);
  res.status(200).send({
    result: 'Created'
  });
});*/

router.post('/', (req, res) => {
  const member = req.body;
  const sql = `
  INSERT INTO member(name, age, createdDate)
  VALUES (?, ?, NOW())
  `;
  db.query(sql, [member.name, member.age], err => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Created'
      });
    }
  });
});

/*router.get('/', (req, res) => {
  res.status(200).send({
    result: 'Success',
    members
  });
});*/

router.get('/', (req, res) => {
  const sql = `
  SELECT * FROM member ORDER BY createdDate DESC
  `;
  db.query(sql, (err, rows) => {
    if (!err || dbError(req, res, err)) {
      console.log(rows);
      res.status(200).send({
        result: 'Success',
        members: rows
      });
      
    }
  });
});

/*router.put('/', (req, res) => {
  members[req.body.key] = req.body.member;
  console.log(members);
  res.status(200).send({
    result: 'Updated'
  });
});*/

router.put('/:idx', (req, res) => {
  const member = req.body;
  const sql = `
  UPDATE member SET name = ?, age = ?
  WHERE idx = ?
  `;
  db.query(sql, [member.name, member.age, req.params.idx], (err, rows) => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Updated'
      });
    }
  });
});

/*router.delete('/:key', (req, res) => {
  const key = Number(req.params.key);
  members.splice(key, 1);
  console.log(members);
  res.status(200).send({
    result: 'Deleted'
  });
});*/

router.delete('/:idx', (req, res) => {
  const sql = `
  DELETE FROM member
  WHERE idx = ?
  `;
  db.query(sql, [req.params.idx], err => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Deleted'
      });
    }
  });
});

module.exports = router;
