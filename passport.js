const passport = require("passport");
// passport-local is a passport strategy for authenticating database
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// Prepare Authentication Strategy Declaration
// This stratgey is ran when there is an attempt to authenticate
const authenticationStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, doneCallback) {
        // In the strategy, we look up a user in the DB that matches this email
        // The way we trigger success or failure is by using the `doneCallback` argument passed to us.
        // This `doneCallback` argument is a function we call.
        // This function takes 2 arguments, the first is an optional error object, the second being a user.
        // If the first argument is null, and a user object is passed then no error happened and the authentication was successful
        // If the first argument is a string then this will be treated like an error occurred
        // If no user was found, then null is passed for the error, but false for the second parameter,
        db.User.findOne({ where: { email: email } })
            .then(function (user) {

                // If no user was found
                if (!user) {
                    return doneCallback(null, false);
                }
                // If the password is not valid
                if (!user.verifyPassword(password)) {
                    return done(null, false);
                }
                // If all other checks passed, user is successfully logged in
                return doneCallback(null, user);
            }).catch(function (err) {
                // If there was a problem
                return doneCallback(err)
            });
    })

// Once the strategy is defined, passport executes it
passport.use(authenticationStrategy);


// Configures Passport authenticated session persistence
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, callback) {
    // Null is passed for the first argument (error), and the user id for the second argument
    callback(null, user.id)
})

passport.deserializeUser(function (id, callback) {
    console.log("Deserializing user");
    // Finds the first user by id
    db.User.findById(id).then(function (foundUser) {
        console.log("Found user");
        console.log(foundUser.get({ plain: true }));
        // If user wasn't found 
        if (!foundUser) {
            return callback(null, false);
        }
        // Sends results back, if user found
        console.log("Calling back with found user");
        console.log(foundUser.get({ plain: true }))
        callback(null, foundUser.get({ plain: true }));
    }).catch(function (err) {
        // In case of an error 
        callback(err);
    });
})

module.exports = passport;