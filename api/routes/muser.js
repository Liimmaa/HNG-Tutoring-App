const errors = require('restify-errors');
const User = require('../models/users');
module.exports = server => {
    // Get all   active users

  //  { path: '/booklesson', version: '1.0.0' }
    server.get( { path: '/users', version: '1.0.0' }, async (req, res, next) => {
        try {
            const tutor = await User.find({ 'status': true });
            res.send(tutor);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }


    });


      
                
             
            
}

