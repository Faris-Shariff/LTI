$(document).ready(function () {
  // document
  //   .getElementById("templateContainer")
  //   .addEventListener("submit", function (event) {
  //     if (event.target.matches("#submitForm")) {
  //       event.preventDefault();

  //       var formData = {};
  //       var formElements = document.getElementById("submitForm").elements;

  //       for (var i = 0; i < formElements.length; i++) {
  //         var element = formElements[i];
  //         var elementName = element.name;
  //         var elementValue = element.value;
    
  //         if (elementName) {
  //           formData[elementName] = elementValue;
  //         }
  //       }
  //       console.log(formData);
  //       // const url = "/oAuth";

  //       // fetch(url, {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type.oauth_signatureplication/json",
  //       //   },
  //       //   body: JSON.stringify(formData),
  //       // })
  //       //   .then((response) => response.json())
  //       //   .then((data) => {
  //       //     console.log("Server response:", data);
  //       //   })
  //       //   .catch((error) => {
  //       //     console.error("Error:", error);
  //       //   });

  //       const urlSearchParams = new URLSearchParams();
  //       for (const key in formData) {
  //         urlSearchParams.append(key, formData[key]);
  //       }

  //       fetch("http://localhost:8080/oAuth", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: urlSearchParams.toString(),
  //       })
  //         .then((response) => response.text())
  //         .then((data) => {
  //           console.log("Server response:", data);
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         });
  //     }
  //   });

  $("#myForm").submit(function (event) {
    event.preventDefault();
    var formData = {};
    var formElements = document.getElementById("myForm").elements;

    var isInstructor = formElements.roles.value === "Instructor";

    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      var elementName = element.name;
      var elementValue = element.value;

      if(elementName){
      if(isInstructor && (elementName == "custom_district_thumb"  || elementName == "custom_domain_name" || elementName == "custom_domain_thumb"
      || elementName == "is_trial_plan" || elementName == "custom_district_name" || elementName == "custom_district_plan"
      || elementName == "custom_instructor_classlist" || elementName == "custom_user_role" || elementName == "launch_url"
      || elementName == "custom_user_account_type" || elementName == "custom_domainid" || elementName == "custom_courseid") ){
        formData[elementName] = elementValue;
      }
      else if (!isInstructor && (elementName == "lis_person_name_family" || elementName == "custom_effective_date" || elementName == "custom_due_date"
      || elementName == "import_report_flow" || elementName == "lis_outcome_service_url" || elementName == "custom_assignment_author"
      || elementName == "custom_assessment_id" ) ){
         formData[elementName] = elementValue;
      }

      else if ((elementName != "lis_person_name_family")  && (elementName != "custom_effective_date") && (elementName != "custom_due_date")
      && (elementName != "import_report_flow") && (elementName != "lis_outcome_service_url") && (elementName != "custom_assignment_author")
      && (elementName != "custom_assessment_id") && (elementName != "custom_district_thumb")  && (elementName != "custom_domain_name") && (elementName != "custom_domain_thumb")
      && (elementName != "is_trial_plan") && (elementName != "custom_district_name") && (elementName != "custom_district_plan")
      && (elementName != "custom_instructor_classlist") && (elementName != "custom_user_role") && (elementName != "launch_url")
      && (elementName != "custom_user_account_type" && elementName != "custom_domainid" && elementName != "custom_courseid") ){
        formData[elementName] = elementValue;
      }
    
    }
  }

    var url = "/";

    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Server response:", data);
    //     data=data["params"]
    //     const container = document.getElementById('templateContainer');

    //     const html = data.map((element) => {
    //       return `<li><strong>${element.key}:</strong> ${element.value}</li>`;
    //     }).join('');

    //     container.innerHTML = `<ul>${html}</ul>`;

    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Server response: Success!");

        const container = document.getElementById("templateContainer");
        container.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
