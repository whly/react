// Start: Mock data
process.mockData = {}
process.mockData.member = [
  {
    name: '홍길동',
    age: '39',
    createdDate: '2018-10-04T12:11:30+09:00'
  },
  {
    name: '김삼순',
    age: '33',
    createdDate: '2018-10-04T13:11:30+09:00'
  },
  {
    name: '홍명보',
    age: '44',
    createdDate: '2018-10-04T14:11:30+09:00'
  },
  {
    name: '박지삼',
    age: '22',
    createdDate: '2018-10-05T14:11:30+09:00'
  },
  {
    name: '권명순',
    age: '10',
    createdDate: '2018-10-06T14:11:30+09:00'
  }
]
// End: Mock data

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const member = require('./routes/member');
const search = require('./routes/search');
const app = express();
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start: Request, Response Settings
app.use((req, res, next) => {
  // res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Access-Token, X-Requested-With, Accept, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// End: Request, Response Settings

// Start: set cross-origin, bodyParser
app.use(bodyParser.json({limit: '1mb'}));
// app.use(bodyParser.urlencoded({extended: false}));
// End: set cross-origin, bodyParser

// Start: express-fileupload
app.use(fileUpload());
// End: express-fileupload

// Start: set public
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render('public/index.html')
});
// End: set public

app.use('/api/v1/member', member);
app.use('/api/v1/search', search);

// Start: start server
const port = 8081;
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
// End: start server
