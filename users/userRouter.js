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
      res.status(500).json({ message: "The server encountered an error when processing this request" })
    })
});


//READ-----------------------------------------//
router.get('/',logger, (req, res) => {
  // do your magic!
  userActions.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "The server encountered an error processing this request" })
    })
});

router.get('/:id', validateUserId, logger, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userActions.getById(id)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "The server encountered an error processing this request" })
    })
});

router.get('/:id/posts', validateUserId, logger, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userActions.getByUserPosts(id)
    .then(posts => {
      console.log(posts)
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "The server encountered an error processing this request" })
    })
});


//UPDATE-----------------------------------------//
router.put('/:id', validateUserId, logger, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  userActions.update(id, body)
    .then(bool => {
      console.log("PUT request", bool)
      res.status(200).json({ message: "Your request was accepted"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "The server encountered an error processing this request" })
    })
});


//DELETE-----------------------------------------//
router.delete('/:id',validateUserId, logger, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userActions.remove(id)
    .then(bool => {
      console.log('accepted / rejected bool:' bool);
      if (bool > 0) {
        res.status(202).json({ message: `User with id: ${id} was removed` })
      } else {
          res.status(404).json({ message: `No user with the id: ${id} was found` })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "The server encountered an error processing this request" })
    })
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
