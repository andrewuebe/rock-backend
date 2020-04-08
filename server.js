const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 5000

app.use(cors()); 
app.use(express.json({
    limit: '50mb',
    extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

app.get('/', function (req, res) {
    res.send('Hello World!!!!');
});

const rocksRouter = require('./routes/rocks');

app.use('/rocks', rocksRouter);

app.listen(port, function () {
    console.log(`The app is listening on port: ${port}`);
}); 