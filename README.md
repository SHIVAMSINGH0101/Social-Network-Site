# Social-Network-Site
This is my social network website project that I developed from scratch. 
I made this Website as part of learning Node.js and React.js.

## Backend
The Backend is made with Node.js framework. I used several npm packages like Express, Mongoose, Cors etc. 
To run this project on Loacl PC, first download MondoDB and set it up. Then create .env in root directory with the following code.
* APP_NAME=nodeapi
* PORT=8080
* JWT_SECRET=xxxxxx
* CLIENT_URL=http://localhost:3000
* REACT_APP_GOOGLE_CLIENT_ID=xxxxxx.apps.googleusercontent.com

cd to that folder and run command npm install to install all required packages. Then set up the frontend and you are good to go.

## Frontend
The Frontend is made with React.js framework.
To run this project on Loacl PC create .env in root directory with the following code.
* REACT_APP_API_URL=http://localhost:8080/api
* REACT_APP_GOOGLE_CLIENT_ID=xxxxxx.apps.googleusercontent.com

cd to that folder and run command npm install to install all required packages. Then run npm start.

