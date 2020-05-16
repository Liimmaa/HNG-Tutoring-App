# Tutoring API

 RESTful API built with Node.js, Restify, Mongoose and JWT. It uses 'jsonwebtoken' to create the token and restify-jwt-community to protect routes.

## Quick Start

```bash
# Install dependencies
npm install

# Serve on localhost:3000
npm start

or   

npm run dev 
```
```
ADMIN======>
email : haliimmaammegwa@gmail.com
password : haliimmaa
```

## Heroku link
https://hng-tutoring-app.herokuapp.com/api/v1


## API Endpoints

#### User Routes

- POST /api/v1/register
- POST /api/v1/auth
- PUT  /api/v1//userupdate/:id(PROTECTED)


#### Tutor Routes

- GET /api/v1/tutor
- POST /api/v1/tutorbyid
- PUT /api/v1/tutor/:id(PROTECTED)

- POST /api/v1/createlesson(PROTECTED)
- PUT /api/v1/updatelesson/:id (PROTECTED)
- DELETE /api/v1/lesson/:id (PROTECTED)



####  Subject Routes

- GET /api/v1/subject
- POST /api/v1/subjectbycatid
- POST /api/v1/tutor/subjectbyname

- POST /api/v1/addsubject(PROTECTED)
- PUT /api/v1/subject/:id (PROTECTED)
- DELETE /api/v1/subject/:id (PROTECTED)




####  Manage Users Routes

- GET /api/v1/users
- POST /api/v1/alltutorsujcat
- POST /api/v1/tutor/mybooks
- POST /api/v1/booklesson




####  Category Routes

- GET /api/v1/category
- POST /api/v1/category(PROTECTED)





## App Info

### Author

Chioma Project


### Version

1.0.0

### License

This project is licensed under the MIT License