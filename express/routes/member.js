const express = require('express');
const router = express.Router();
const moment = require('moment');
const members = process.mockData.member

router.post('/', (req, res) => {
  const member = req.body;
  member.createdDate = moment().format();
  members[members.length] = req.body;
  console.log(members);
  res.status(200).send({
    result: 'Created'
  });
});

router.get('/', (req, res) => {
  res.status(200).send({
    result: 'Success',
    members
  });
});

router.put('/', (req, res) => {
  members[req.body.key] = req.body.member;
  console.log(members);
  res.status(200).send({
    result: 'Updated'
  });
});

router.delete('/:key', (req, res) => {
  const key = Number(req.params.key);
  members.splice(key, 1);
  console.log(members);
  res.status(200).send({
    result: 'Deleted'
  });
});

module.exports = router;
