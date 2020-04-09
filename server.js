const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(cors());

// set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connect to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(res=>{
          console.log("DB Connected!")
  }).catch(err => {
    console.log(Error, `tahaha ${err.message}`);
  })

// Hello World!
app.get('/', function (req, res) {
    res.send('Hello World!!!!');
});

// api routes
const rocksRouter = require('./routes/rocks');
app.use('/rocks', rocksRouter);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : (process.env.PORT || 5000);
app.listen(port, function () {
    console.log(`The app is listening on port: ${port}`);
}); 