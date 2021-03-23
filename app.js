const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const filmRoutes = require('./routes/film');
const searchRoutes = require('./routes/search');
const serialRoutes = require('./routes/serial');
const personRoutes = require('./routes/person');
const feedbackRoutes = require('./routes/feedback');
const keys = require('./config/keys');
const app = express();

// const MongoClient = require('mongodb').MongoClient;
// let db;
// const mongoClient = new MongoClient(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoClient.connect(function (err, database) {
//     if (err) {
//         throw err;
//     }
//     db = database.db(keys.dbName);
//     console.log('MongoDB connected.')
// });
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);


app.use(require('morgan')('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/product', searchRoutes);
app.use('/api/serial', serialRoutes);
app.use('/api/person', personRoutes);
app.use('/api/feedback', feedbackRoutes);


module.exports = app;
