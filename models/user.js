var connection = require('../connection');

function User() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from users', function(err, result) {
        con.release();
        res.send(JSON.stringify(result));
      });
    });
  };

  this.create = function(user, res) {
    connection.acquire(function(err, con) {
      con.query('insert into users set ?', user, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'USER creation failed', query: 'insert into users set ' + user});
        } else {
          res.send({status: 0, message: 'USER created successfully'});
        }
      });
    });
  };

  this.update = function(user, res) {
    connection.acquire(function(err, con) {
      con.query('update users set ? where email = ?', [user, user.email], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'USER update failed'});
        } else {
          res.send({status: 0, message: 'USER updated successfully'});
        }
      });
    });
  };

  this.delete = function(email, res) {
    connection.acquire(function(err, con) {
      con.query('delete from users where email = ?', [email], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };

  this.search = function(email, res) {
    connection.acquire(function(err, con) {
      con.query('select * from users where email = ?', [email], function(err, result) {
        con.release();
        if(err) {
          res.send({status:1, message: 'Failed to search'});
        } else {
          if(result.length == 0) {
            res.send({status: 0, message: 'User not found'});
        } else {
          res.send(result);
          }
        }
      });
    });
  }
}
module.exports = new User();