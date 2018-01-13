# Cody's 18652-FSE-Chat
18652 Pre-Registration Programming Assignment

A simple chat application built on:

## Server Side
| Package | Use |
| --- | --- |
| Node.js | Used as a web server |
| express-generator | Provides a boilerplate Express project |
| Express.js | Used as a web framework, particularrly for HTTP request routing |
| Express-sessions | To locally cache user login details |
| SQLite | A file-based database solution |
| Sequelize | Database ORM, so I don't have to write SQL queries |

## Client Side

| Package | Use |
| --- | --- |
| Vue.js | Provides model-view dynamic binding |
| Axios | Made making AJAX HTTP requests easier |
| Bootstrap | Used as a CSS framework for application responsiveness |

And the usual suspects (HTML5/ES6/CSS3)

## Installation
The project is designed to be run completely within Node.js. No external database is required. To install simple run `npm i` in the project project's root directory. It may be necessary to install sqlite3 manually, if prompted run `npm install sqlite3`.

## Usage
To run the server simply open a command prompt or terminal in the project's root directory (on Windows shift-right-click in the window and click the "Open PowerShell window here"), then execute "npm start".

Once the server has started, open a web browser and navigate to http://127.0.0.1:3000/ (if on the host machine, otherwise use the server's IP address).

## Dev Notes
- Run `SET DEBUG=18652-FSE-Chat:* & npm run devstart` to enable automatic server restarts on file changes
- Application is currently designed to wipe the database on server restart, this behavior can be changed by removing the force option on lines 28 and 39 in `/app.js`.
- It is recommended to not use `localhost:3000` to access the server as it may cause issues with express-sessions.
- CMU-SV is pretty awesome
