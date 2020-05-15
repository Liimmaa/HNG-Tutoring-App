const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../../auth');
const Lesson = require('../models/lesson');
const Books = require('../models/book');
const config = require('../../config');
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

  //   //get tutor by cat and subject

    server.post({ path: '/alltutorsujcat', version: '1.0.0' }, async (req, res, next) => {
  const arrays =[];
        const { CatID,sujectID } = req.body;
        try {
          const lesson = await Lesson.find({ CatID,sujectID });

          lesson.forEach( async(arry)=>{

            try{
                const info = await User.findById(arry.id);

                arrays.push(info)
            }catch(err){
                return next(new errors.ForbiddenError(err));
            }
            
          })

          
          res.send(arrays);
          next();
        } catch (err) {
          return next(new errors.InvalidContentError(err));
        }
    
    
      });
//my bookings
      server.post({ path: '/mybooks', version: '1.0.0' }, async (req, res, next) => {
 
              const { UserID } = req.body;
              try {
                const books = await Book.find({UserID });
      
                res.send(books);
                next();
      
                
             
              } catch (err) {
                return next(new errors.InvalidContentError(err));
              }
          
          
            });
// //book a lesson
            server.post({ path: '/booklesson', version: '1.0.0' }, async (req, res, next) => {
             if( student(req)){
                const { UserID,LessonID,TutorID } = req.body;

                const book= new Books({
                    UserID,LessonID,TutorID
                })
                try {
                  const books = await book.save();
        
                  res.send('you have book a section');
                  next();                                                                  
                  
               
                } catch (err) {
                  return next(new errors.InvalidContentError(err));
                }

             }else{
                return next(new errors.InvalidContentError('Your are not authorized'));
             }
       
            
            
              });
};


function student(req){
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,config.JWT_SECRET);
    const role = decodedToken.role;
    if ( req.body.role == 'student' ||   req.body.role == 'admin') {
   return true;
    } else {
     return false;
    }                                                                             
  }