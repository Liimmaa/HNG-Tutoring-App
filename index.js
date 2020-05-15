const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');  

var versioning = require('restify-url-semver'); 
const server = restify.createServer();

server.pre(versioning({ prefix: '/api' }))
// Middleware
server.use(restify.plugins.bodyParser());

// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));
server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true,useUnifiedTopology:true }
    );
  });
  
  
  const db = mongoose.connection;
  
  db.on('error', err => console.log(err));

  db.once('open', () => {
    require('./api/routes/category')(server);
    require('./api/routes/users')(server);
    require('./api/routes/subject')(server);
    require('./api/routes/muser')(server);
    console.log(`Server started on port ${config.PORT}`);
  });