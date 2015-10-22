# Samurai Survey

NodeJS Express application for giving surveys to guests. Also allows admins to view survey results. Features and Frameworks used by the application:

  - Express
  - Angular
  - Sequelize (w/MySQL)
  - Gulp
  - Browserify

Samurai Survey allows an administrator to create surveys that can be viewed and answered by guests to the site. Guests will only be given the same survey once and the surveys given to them are randomized. Administrators are also able to view the results, or add/delete surveys. (default login username:admin password:pw1234)

### Installation/Setup

Clone the repository and run the following first:

``` sh
npm install
```

Before you are start the server up, you will need to set up a MySQL server/database and set the proper config files in config.js:

``` javascript
module.exports = {
  port: 8080, // Port to run the application on
  connString: "mysql://root@localhost:3306/EXAMPLE_DB", // ConnString
  admin: "admin", // Admin dashboard login (for the site)
  password: "pw1234" // Admin dashboard password (for the site)
};
```

Then run the following to start the application:

``` sh
node server.js
```

The server should now be visible at http://localhost:8080

### Version
1.0.0
