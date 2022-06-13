# Daily

Es un sitio web para notas con login

frontend: [link](https://github.com/JosenRomero/Daily)
backend: [link](https://github.com/JosenRomero/backend-with-nodejs)

## Built using

#### frontend

- React JS
- Bootstrap
- Redux

#### backend

- Node JS 
- MongoDB
- Express
- passport (passport-facebook and passport-google-oauth)

## backend

#### Installation 

```
$ git clone https://github.com/JosenRomero/backend-with-nodejs.git 
$ cd backend-with-nodejs
$ npm install
$ npm start
```

#### Env variable:

Create .env file in config folder and add the following:

```
URI_DB="mongodb://localhost:27020/databaseName"
CLIENT_URL="http://localhost:3000"
API_URL="http://localhost:3001"
SECRETCODE="anyRandomPhrase"
FACEBOOK_APP_ID=""
FACEBOOK_APP_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

#### MongoDB

You need to install MongoDB on your computer and start MongoDB.

#### passport 

##### passport-facebook 

Before using Facebook Login, you must register your app with Facebook.
This can be done in [https://developers.facebook.com/apps](https://developers.facebook.com/apps)

#### passport-google-oauth

Before using Google Login, you must register your app with Google.
This can be done in [https://console.cloud.google.com/](https://console.cloud.google.com/)

#### Build

```
$ npm run build
```

## frontend

see: [https://github.com/JosenRomero/Daily](https://github.com/JosenRomero/Daily)