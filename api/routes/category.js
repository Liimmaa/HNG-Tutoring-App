const errors = require('restify-errors');
// const rjwt = require('restify-jwt-community');
 const Category = require('../models/category');
// const config = require('../config');

module.exports = server => {
  // Get all Category

 // { path: '/category', version: '1.0.0' }
  server.get({ path: '/category', version: '1.0.0' }, async (req, res, next) => {
try{
    const category= await Category.find({});
     res.send(category);
      next();
}catch(err){
    return next(new errors.InvalidContentError(err));
}

   
  });


  server.post(
    { path: '/category', version: '1.0.0' },
  async (req, res, next) => {
      // Check for JSON
    
        if (!req.is('application/json')) {
          return next(
            new errors.InvalidContentError("Expects 'application/json'")
          );
        }
  
        const { name, description } = req.body;
  
        const category = new Category({
          name,
          description
        });
  
        try {
          const newCategory = await category.save();
          res.send(201);
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
    }
  );



}

