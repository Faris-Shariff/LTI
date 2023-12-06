const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
OAuth = require("oauth");
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const port = 8083

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

    const response = await axios.post('http://localhost:8081/ltiLaunch', formData.toString(), {
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
  var extraParams = req.body;
  var OAuth = require("oauth");

  var oauthUrl = "https://learnuat.glider.ai/ltiLaunch";
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

  extraParams = {
  context_id: 'kC9fvFi6XfFXCJ8gQ',
  context_title: 'xc%20xc',
  //custom_assessment_id: '253310',
  //custom_assignment_author: 'GduqyQajsx3krzHap',
  //custom_assignment_params: '{"isProctored":false,"validTill":1689572049976,"allAttemptedQuestionIds":[]}',
  //custom_course_name: 'g4GZp8xa9rnbbQwbu_all_course',
  //custom_courseid: 'g4GZp8xa9rnbbQwbu_all',
  //custom_district_id: 'g4GZp8xa9rnbbQwbu',
  //custom_domainid: 'g4GZp8xa9rnbbQwbu',
  //custom_due_date: '1719566141901',
  //custom_effective_date: '1687943741901',
  //custom_grade: 'all',
  //custom_subject: 'all',
  //import_report_flow: 'IMPORT_FLOW',
  launch_presentation_document_target: 'iframe',
  launch_presentation_return_url: 'http://glider.com/userProfile',
  lis_outcome_service_url: 'http://localhost:3000/api/update/assignment/result',
  lis_person_contact_email_primary: 'shankaoauthtest123@glider.ai',
  //lis_person_name_family: '%20',
  lis_person_name_given: 'shankaoauthtest123',
  lti_message_type: 'basic-lti-launch-request', //'takeAssignment',
  lti_version: 'LTI-1p0',
  roles: 'Learner',
  tool_consumer_info_product_family_code: 'DoceboLearn', //'glider',
  tool_consumer_instance_guid: 'intuitsandbox.docebosaas.com', //'com.gliderapp.snapwiz',
  tool_consumer_instance_name: 'Intuit Inc.', //'Edulastic',
  user_id: 'D4tNXndYtJXQi7ddz74D46'
  //test_id: "kC9fvFi6XfFXCJ8gQ"
  }
  console.log({extraParams});

  var orderedParams = oauth._prepareParameters("", "", method, url, extraParams);
  var eparams = [];
  orderedParams.forEach(function (a) {
      var obj = {
          key: a[0],
          value: a[1],
      };
      eparams.push(obj);
  });
  // console.log({eparams});
  // console.log("Hits");
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