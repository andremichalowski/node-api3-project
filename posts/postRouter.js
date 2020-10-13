//IMPORTS

const express = require('express');
const router = express.Router();

const postActions = require('./postDb');



//READ-----------------------------------------//
router.get('/', (req, res) => {
  // do your magic!
  postActions.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Your request could not be completed."})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  postActions.getById(id)
    .then(user => {
      res.status(200).json({user})
    })
    .catch(error => {
      res.status(500).json({message: "Your request could not be completed."})
    })
});


//UPDATE-----------------------------------------//
router.put('/:id', (req, res) => {
  // do your magic!
  .then(user => {
    res.status(200).json({message: `The post with id: ${id} was deleted`})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Your request could not be completed"})
  })
});


//DELETE-----------------------------------------//
router.delete('/:id', (req, res) => {
  // do your magic!
});


// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
