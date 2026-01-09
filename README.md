## This code assessment tests your ability to:

* Finish the project I started in the previous video.
* Add POST, GET by ID, PUT By Id, DELETE By ID functionality.
* So your (by Id) methods should look like this when executed from Postman:
* GET by ID - http://localhost:3000/{your context name}/45
* PATCH or PUT by ID - http://localhost:3000/{your context name}/89
* DELETE by ID - http://localhost:3000/{your context name}/9
* GET - http://localhost:3000/{your context name}
* POST - http://localhost:3000/{your context name}
* These URLs are for viewing the results in Postman and the ID should show in your output
* You should have 5 methods in all (GET, GET by ID, POST, PUT or PATCH by ID, DELETE by ID)
* Your localhost:3000 should show your actuator message: "Service is up"
* DON'T FORGET TO STORE - Implement in-memory data storage define an array or other data type
* IF YOU ARE RETAKING THE COURSE: The data store MUST be done with the `fs` module in Node JS. Node JS - File System


## Endpoints

* GET - /api/v1/users
* GET - /api/v1/users/:userId
* POST - /api/v1/users
* PUT - /api/v1/users/:userId
* DELETE - /api/v1/users/:userId

## Setup

```
git clone git@github.com:RiveraTerryn-FS/nodejscodingassignment.git
npm install
```