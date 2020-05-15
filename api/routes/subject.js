const errors = require('restify-errors');
// const rjwt = require('restify-jwt-community');
 const  Subject = require('../models/subject');
// const config = require('../config');
// { path: '/subject/:id', version: '1.0.0' }
module.exports = server => {
  // Get all    Subject
  server.get({ path: '/subject', version: '1.0.0' }, async (req, res, next) => {
try{
    const   subject= await   Subject.find({});
     res.send(subject);
      next();
}catch(err){
    return next(new errors.InvalidContentError(err));
}

   
  });
//get subject by category(id)

  server.post({ path: '/subjectbycatid', version: '1.0.0' }, async (req, res, next) => {
    const { categoryID } = req.body;
    try{
        const   subject= await   Subject.find({'categoryID':categoryID});
         res.send(subject);
          next();
    }catch(err){
        return next(new errors.InvalidContentError(err));
    }
    
       
      });


      //search for subject by name

  server.post({ path: '/subjectbyname', version: '1.0.0' }, async (req, res, next) => {
    const { name } = req.body;
    try{
        const   subject= await   Subject.find({'name':name}).sort([['name', 'ascending']]);
         res.send(subject);
          next();
    }catch(err){
        return next(new errors.InvalidContentError(err));
    }
    
       
      });

//add subject
  server.post(
    { path: '/addsubject', version: '1.0.0' },

    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      const { name, description,categoryID } = req.body;

      const     subject = new  Subject({
        name,
        description,
        categoryID
      });

      try {
        const newSubject = await   subject.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

    // Update subject
    server.put(
      { path: '/subject/:id', version: '1.0.0' },

        async (req, res, next) => {
          // Check for JSON
          if (!req.is('application/json')) {
            return next(
              new errors.InvalidContentError("Expects 'application/json'")
            );
          }
    
          try {
            const     subject = new  Subject.findOneAndUpdate(
              { _id: req.params.id },
              req.body
            );
            res.send(200);
            next();
          } catch (err) {
            return next(
              new errors.ResourceNotFoundError(
                `There is no subject with the id of ${req.params.id}`
              )
            );
          }
        }
      );

      //remove a subject

      server.del(
        { path: '/subject/:id', version: '1.0.0' },

        async (req, res, next) => {
          try {
            const    subject = new  Subject.findOneAndRemove({
              _id: req.params.id
            });
            res.send(204);
            next();
          } catch (err) {
            return next(
              new errors.ResourceNotFoundError(
                `There is no subject with the id of ${req.params.id}`
              )
            );
          }
        }
      );

};