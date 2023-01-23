const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/login', async (req, res) => {

  try {
    res.render('login', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {  

  try {
    res.render('register', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {

  const postId = req.params.id;

  try {
    const postData = await Post.findAll({ 
      where: { id: postId }
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } 

});

router.get('/post', withAuth, async (req, res) => {

  try {
    
    res.render('post', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {

  try {
    const postData = await Post.findAll({
     where: {
        user_id: req.session.user_id,
     },
     order: [
      ["date_created", "DESC"],
    ],
     include: [
          {
            model: User,
          },
          {
            model: Comment,
            include: [User]
          },
        ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        order: [
          ["date_created", "DESC"],
        ],
        include: [
          {
            model: User,
          },
          {
            model: Comment,
            include: [User]
          },
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;