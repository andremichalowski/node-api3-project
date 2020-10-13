const express = require('express');

const router = express.Router();

const userActions = require('./userDb')



//CREATE-----------------------------------------//
router.post('/', validateUser, logger, (req, res) => {
  const newUser = res.body;
  userActions.insert(newUser) //<<< Key info here
    .then(bool => {
      console.log(bool)
      res.status(201).json({message: "new user created"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "The server encountered an error processing this request"})
    })
});

router.post('/:id/posts', validatePost, logger, (req, res) => {
  const newPost = req.body;
  userActions.insertPost(newPost) //<<< Key info here
    .then(post => {
      res.status(201).json({message: "new post created"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(message: "The server encountered an error when processing this request")
    })
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
