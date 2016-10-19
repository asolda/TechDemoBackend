var user = require('./models/user');
 
module.exports = {
  configure: function(app) {
    
    app.get('/user/', function(req, res) {
      user.get(res);
    });
 
    app.post('/user/', function(req, res) {
      user.create(req.body, res);
    });
 
    app.put('/user/', function(req, res) {
      user.update(req.body, res);
    });
 
    app.delete('/user/:email/', function(req, res) {
      user.delete(req.params.email, res);
    });

    app.get('/user/search/:email/', function(req, res) {
      user.search(req.params.email, res);
    });
  }
};