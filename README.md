# Introduction

A sample backend Node JS application for a personal project. It aggregates and accumulated data from the Postgres SQL database server and provides network APIs that can be consumed by other web and mobile based applications. The backend was developed using the express framework and it's suggested guidelines.

# Environment Setup

1.  Install Node JS, preferably 10.19.0 or greater. Make sure it is accessible globally by adding environmental variables to the system environment, if not done by default during the setup.
2.  Recommended code-editor: `Visual Studio Code`

# Development Guidelines

1.  Traverse to the project directory and run `npm install` to install all the project specific dependencies and libraries.
2.  Include the provided `.env` or create one with the following details
      
        ```
        DB_HOST={IP Address of the database server}
        DB_USER={Username of the client accessing database server}
        DB_PASS={Password of the client accessing database server}
        DB_NAME={Name of the database}
        ```

3.  Run `npm start` to start the development server which can be accessed through `http://localhost:port`, port = 3000 at the time of development.
4.  The configuration of the server can be found in `/bin/www`
5.  `app.js` is the entry file where all the routes are defined.
6.  Directory Structure

# Production Deployment

1. Traverse into the directory
2. Run `npm install pm2 -g` to install the pm2 production process manager for NodeJs globally.
3. Run `pm2 start /bin/www to start the server

```
bin/
    www - Configuration File
controller/
    Includes all the controller files which contain functions for accessing the database.
node_modules/
    Files related to dependencies and libraries
public/
    Static assets can be stored here to be accessed and shared through the api.
routes/
    Includes all the files that specify API routes and controller calls associated with particular routes.
views/
    Files that can be used to specific web pages depending on request like errors.
.env 
    Contains critical information such as secret keys and passwords
.gitignore
    Files that should be ignored by git such as .env
app.js
    Main entry file of the application 
db.js
    Database config and connection 
package.json
    Contains meta-information about the project
```

# Versioning

Versions of different dependencies and libraries during the development which are liable to modification according to the developer's discretion.

- express - 4.16.1
- pg - 8.5.1
- dotenv - 8.2.0

# Routes

- `GET /doctors/` -> Return details of all doctors from the database
- `POST /doctors/` -> Save details of a doctor to the database and returns it's row id from database. The strucutre of the request should be like below:
```
*Body*
- Type - raw/json
{
    "name": "Bob"
}
```
- `GET /devices/` -> Return details of all devices from the database
- `GET /images/` -> Return details of all images from the database
- `GET /images/:id` -> Return details of image with the id={:id}
- `GET /images/doctor/:id` -> Return all the images belonging to a doctor with id={:id}
- `GET /images/image_detail/:id` -> Return the image file with id={:id}
- `POST /images/` -> Save details of an image to the database. The strucutre of the request should be like below:
```
*Headers*
- Content-type - multipart/form-data
- device_id - '2341AD' (String)
- doctor_id - 1 (Integer)

*Body*
- Type - form-data
- Add a field called to send the the image file like `File - {file}`

```
