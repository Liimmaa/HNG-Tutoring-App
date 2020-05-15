const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Lesson = require('../models/lesson');
const auth = require('../../auth');
const config = require('../../config');

const v1='api/v1'

module.exports = server => {
  // Get all   tutors by id

  server.post( { path: '/tutorbyid', version: '1.0.0' }, async (req, res, next) => {
    const { id } = req.body;
    try {
      const tutor = await User.findOne({ '_id': id, 'status': true })
      res.send(tutor);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }


  });

  server.get({ path: '/tutor', version: '1.0.0' },async (req, res, next) => {



  try {
    const tutor = await User.find({ 'role': 'tutor', 'status': true }).sort([['name', 'ascending']]);;
    res.send(tutor);
    next();
  } catch (err) {
    return next(new errors.InvalidContentError(err));
  }



   

  });


  //Update a registed lesson



  // { path: '/lesson/:id', version: '1.0.0' }
  //Update a registed lesson
  server.put(  { path: '/tutor/:id', version: '1.0.0' }, async (req, res, next) => {

    if(tutor(req)){

      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }
  
      try {
        const tutor = await Lesson.findOneAndUpdate({ _id: req.params.id },
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

//Register a lesson

  server.post(  { path: '/createlesson', version: '1.0.0' }      , async (req, res, next) => {


    if(tutor(req)){
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }
      const { sujectID, UserID, CatID, name,
        desc } = req.body;
      const groupID = UserID + sujectID;
      const createLesson = new Lesson({
        sujectID,
        UserID,
        CatID,
        groupID,
        name,
        desc
      });
      try {
        const lesson = await createLesson.save();
        res.send('Lesson created');
        next();
      } catch (err) {
        return next(new errors.InvalidContentError(err));
      }
  
    }
    else{
      return next(new errors.InvalidContentError('Your are not authorized'));
  }

    



  });
  //All registered lesson by tutor
  server.post('/mylesson', async (req, res, next) => {
    if(tutor(req)){
      const { UserID } = req.body;
      try {
        const lesson = await Lesson.find({ UserID });
        res.send(lesson);
        next();
      } catch (err) {
        return next(new errors.InvalidContentError(err));
      }
  
  
    }else{
      return next(new errors.InvalidContentError('Your are not authorized'));
    }
 
  });

  //update a registered subject
  server.put(
    { path: '/updatelesson/:id', version: '1.0.0' },

    async (req, res, next) => {
      // Check for JSON

      if(tutor(req)){
        if (!req.is('application/json')) {
          return next(
            new errors.InvalidContentError("Expects 'application/json'")
          );
        }
  
        try {
          const     lesson = new  Lesson.findOneAndUpdate(
            { _id: req.params.id },
            req.body
          );
          res.send('Lession updated');
          next();
        } catch (err) {
          return next(
            new errors.ResourceNotFoundError(
              `There is no lesson with the id of ${req.params.id}`
            )
          );
        }
      }else{
        return next(new errors.InvalidContentError('Your are not authorized'));
      }
     
    }
  );

//remove a lesson subject
  server.del(
    { path: '/lesson/:id', version: '1.0.0' },
    async (req, res, next) => {

      if(tutor(req)){
        try {
          const    lesson = new  Lesson.findOneAndRemove({
            _id: req.params.id
          });
          res.send(204);
          next();
        } catch (err) {
          return next(
            new errors.ResourceNotFoundError(
              `There is no lesson with the id of ${req.params.id}`
            )
          );
        }
      }
      else{
        return next(new errors.InvalidContentError('Your are not authorized'));
      }
 
    }
  );

};


function tutor(req){
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token,config.JWT_SECRET);
  const role = decodedToken.role;
  if ( req.body.role == 'tutor') {
 return true;
  } else {
   return false;
  }
}