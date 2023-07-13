const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
OAuth = require("oauth");
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const port = 8081

app.use(bodyParser.json());
// app.use(morgan('tiny'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.post('/oAuth', async (req, res) => {
  console.log("/oAuth")
  console.log(req.body);
  // res.json({ status: 'success', message: 'Data received successfully! Faris!!' });
  try {
    const formData = new URLSearchParams();
    for (const key in req.body) {
      formData.append(key, req.body[key]);
    }

    const response = await axios.post('http://localhost:8080/oAuth', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the request' });
  }
});

app.post('/', (req, res) => {
  const extraParams = req.body;
  console.log(extraParams);
  var OAuth = require("oauth");

  var oauthUrl = "http://localhost:8080/oAuth";
  var resultObj = {};

  // resultObj["url"] = Meteor.settings.EdulasticHost[process.env.ENV].hostIP;
  // if (!companyId) {
  //     return resultObj;
  // }
  var oauth = new OAuth.OAuth(
      oauthUrl,
      oauthUrl,
      "Eduglider",
      "lInXLgx6HbF9FFq1ZQN8iSEnhzO3JVuf",
      "1.0",
      null,
      "HMAC-SHA1"
  );

  var method = "post", url = oauthUrl;

  var orderedParams = oauth._prepareParameters("", "", method, url, extraParams);
  var eparams = [];
  orderedParams.forEach(function (a) {
      var obj = {
          key: a[0],
          value: a[1],
      };
      eparams.push(obj);
  });
  console.log({eparams});
  console.log("Hits");
  // res.json({ status: 'success', message: 'Data received successfully!', params : eparams });
  res.render('params', { params: eparams });
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }
      res.send(data);
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})