const db = require('../models/user');
// Load in local passport module
const passport = require('passport');

module.exports = function (app) {
  // Load index page 

  //Loads the signup page 
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/signup2", function (req, res) {
    // If users are not logged in, redirect users to the signup page
    if (!req.user) {
      console.log("Redirecing to signup because user is not logged in");
      return res.redirect('/signup');
    }
    res.render("signup2");
  });

  app.post("/signup2", function(req, res) {
    if (!req.user) {
      // Users shouldn't be able to get to this point, if they're not logged in 
      return res.redirect('/signup')
    }

    db.User.update(req.body,{ where: {id: req.user.id}}).then(() => {
      // Successful user update, redirect back to the dashboard
      return res.redirect('/');
    }).catch(function(err) {
      // User update error
      console.log(err);
      res.redirect('/signup2');
    })
  });

  app.get("/socials/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function (foundUser) {
      res.render("socials", {
        user: foundUser,
        layout: 'profile'
      });
    });
  });


  app.get("/login", function (req, res) {
    res.render("login");
  });

  // Once users posts to the login form, local authentication strategy that was declared is excecuted
  // In case of a failure, users will be redirected back to /login
  app.post('/login', 
    passport.authenticate('local', {failureRedirect: '/login'}), 
    function(req, res) {
      // Following method is called during success
      // In case of success, users redirected to hompage
      res.redirect('/');
    })

  app.get('/logout', function(req, res) {
    // Best practice for logout is to destroy the session
    req.session.destroy(function() {
      // Once it's destroyed, users redirected to the homepage
      res.redirect('/');
    })
  })

  app.get("/", function (req, res) {

    if (req.user) {
      res.render("dashboard", {
        layout: 'dashboard'
      });
    } else {
      res.render("index");
    }
  });

  app.get("/settings", function (req, res) {
    res.render("settings");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};