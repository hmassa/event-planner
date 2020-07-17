# Event Planner
Event planner for Paycom's Summer Engagement Program. The front-end of the web app is built with React and communicates with a
MySQL database using PHP. Users can create an account, login, view events, edit events, and delete events.

## How to run
Since the front end is built with React, it can be run with 'npm start'. During development, I had my database and server-side scripts running on XAMPP, so the PHP files have the appropriate access-control headers to allow the two parts of the application to communicate. I also had my Apache port set as 8080, so it may be necessary to change the URLs of the post and get requests. Once the app starts, users are directed to the login page and have the option to register. Once logged in, users can see all of their events, edit, delete, and create events. 

**Note: some login data (username, first name) is stored in local stoarage, so the wab app will not work correctly in private browsers.
