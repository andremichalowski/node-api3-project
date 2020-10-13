const express = require('express');

const router = express.Router();

const userActions = require('./userDb')



//CREATE-----------------------------------------//
router.post('/', (req, res) => {
  // do your magic!

});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});


//READ-----------------------------------------//
router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});


//UPDATE-----------------------------------------//
router.put('/:id', (req, res) => {
  // do your magic!
});


//DELETE-----------------------------------------//
router.delete('/:id', (req, res) => {
  // do your magic!
});




//custom middleware

function logger(req, res, next) {
  console.log('Req.method:', req.method, 'Req.url:' req.url, 'timestamp:' Date.now())
  next();
}

function validateUserId(req, res, next) {
  // do your magic!
  userActions.getById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({message: "Invalid user ID"})
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(typeof req.body) //review this later
  if(req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({message: "New users must include a name"})
    }
  } else {
    res.status(400).json({message: "Missing user data"})
  }
}

function validatePost(req, res, next) {
  // do your magic!
  console.log(req.body)
  if (Object.keys(req.body).length !== 0) { //Review this later
    if (req.body.text) {
      next()
    } else {
      res.status(400).json({message: "missing required text field"})
    }
  } else {
    res.status(400).json({message: "Missing post data"})
  }
}

module.exports = router;
