const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'keepInTouch',
});

// The backend point to check for users in the database
router.post('/', function(req, res, next) {
    let username = req.body.username;

// Password encryption with salt and hash     
    exports.cryptPassword = function(password, callback) {
        bcrypt.genSalt(10, function(err, salt) {
         if (err) 
           return callback(err);
     
         bcrypt.hash(password, salt, function(err, hash) {
           return callback(err, hash);
         });
       });
     };
     
     exports.comparePassword = function(plainPass, hashword, callback) {
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
            return err == null ?
                callback(null, isPasswordMatch) :
                callback(err);
        });
     };
    let password = req.body.password;
    connection.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password], function(err, rows, fields) {
      if(err)
      console.log(err); 
      if(rows.lenght > 0) {
          res.send({'success': true, 'message': row[o].username});
      }else{
          res.send({'success': false, 'message': 'User not found, please try again!'});
      }
      
    });
});

module.exports = router;
