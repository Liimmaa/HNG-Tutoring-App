const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../../auth');
const config = require('../../config');
// { path: '/userupdate/:id', version: '1.0.0' }

module.exports = server => {
  // Register User
  server.post({ path: '/register', version: '1.0.0' }, (req, res, next) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash Password
        user.password = hash;
        // Save User
        try {
          const newUser = await user.save();
          res.send('New user created');
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });

 // Auth User
  server.post({ path: '/auth', version: '1.0.0' }, async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        // expiresIn: '15m'
      });

      const { iat, exp } = jwt.decode(token);
      // Respond with token
      res.send({ iat, exp, token });

      next();
    } catch (err) {
      // User unauthorized
      return next(new errors.UnauthorizedError(err));
    }
  });


  server.put({ path: '/userupdate/:id', version: '1.0.0' }, async (req, res, next) => {

    if(admin(req)){

      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }
  
      try {
        const tutor = await User.findOneAndUpdate({ _id: req.params.id },
          req.body);
        res.send(tutor);
        next();
      } catch (err) {
        return next(new errors.InvalidContentError(err));
      }

    }
    else{
      return next(new errors.InvalidContentError('Your are not authorized'));
  }



  })
};

function admin(req){
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,config.JWT_SECRET);
    const role = decodedToken.role;
    if (  req.body.role == 'admin') {
   return true;
    } else {
     return false;
    }
  }