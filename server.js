'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const models            = require('./models');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
const port = process.env.PORT || 3000
const {DB} = process.env;

async function main() {
  let connection;

  try {
    connection = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      poolSize: 50,
    });
    console.log('Database connected');

    models.init(connection);
  } catch (err) {
    console.error('Cannot connect to database');
    throw err;
  }

  app.listen(port, function () {
    console.log(`Listening on port ${port}`);

    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');

      setTimeout( () => {
        try {
          runner.run();
        } catch(e) {
          let error = e;
            console.log('Tests are not valid:');
            console.log(error);
        }
      }, 1500);
    }
  });
}

main().catch((err) => console.error(err));

module.exports = app; //for unit/functional testing
