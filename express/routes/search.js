const express = require('express');
const router = express.Router();
const _ = require('lodash');
const members = process.mockData.member

router.get('/', (req, res) => {
  const name = req.query.name;
  let sMember = members;
  if (name) {
    sMember = _.filter(members, (member) => {
      return member.name.indexOf(name) >= 0;
    });
  }
  res.status(200).send({
    result: 'Success',
    members: sMember
  });
});

module.exports = router;
