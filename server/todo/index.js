const express = require('express')
const router = express.Router()
const TODO = require('../db/models/todo')

router.post('/', (req, res) => {
  const {username, heading, description, iscompleted, comment} = req.body
  const newTODO = new TODO({
    'username': username,
    'heading': heading,
    'description': description,
    'iscompleted': iscompleted,
    'comment': comment
  })
  newTODO.save((err, savedTODO) => {
    if (err) return res.json(err)
    return res.json(savedTODO)
  })
})

router.get('/', (req, res, next) => {
  TODO.find()
  .then(data => res.json(data))
  .catch(next)
});

router.delete('/:id', (req, res, next) => {
  TODO.findOneAndRemove({"_id": req.params.id})
  .then(data => res.json(data))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  const {value} = req.body
  TODO.findOneAndUpdate({"_id": req.params.id}, {"$set": { iscompleted: value}})
  .then(data => res.json(data))
  .catch(next)
})

module.exports = router
