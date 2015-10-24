# Samurai Survey

NodeJS Express application for giving surveys to guests. Also allows admins to view survey results. Features and Frameworks used by the application:

  - **Express**
  - Angular
  - **Sequelize (w/MySQL)**
  - Gulp
  - Browserify

Samurai Survey allows an administrator to create surveys that can be viewed and answered by guests to the site. Guests will only be given the same survey once and the surveys given to them are randomized. Administrators are also able to view the results, or add/delete surveys. (default login username:admin password:pw1234; The login page can be accessed by the link at the bottom right of the page).

The application utilizes very basic view routes, then uses Angular to access the web api for retreiving/answering surveys, creating new surveys, and removing unwanted surveys.

### Installation/Setup

Clone the repository and run the following first:

``` sh
npm install
```

Before you are start the server up, you will need to set up a MySQL server/database and set the proper config files in /config/config.json. Example of file:

``` javascript
{
  "development": {
    "username": "root",
    "password": NULL,
    "database": "samurai_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": NULL,
    "database": "samurai_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": NULL,
    "database": "samurai_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Then run the following to start the application (will probably want something like *forever* for production):

``` sh
node server.js
```

The server should now be visible at http://localhost:8080

### Notes
Apologies in advance if your eyes bleed. I'm not the greatest designer in the world. :)

### Version
1.0.0
