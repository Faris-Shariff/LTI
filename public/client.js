$(document).ready(function () {
  document
    .getElementById("templateContainer")
    .addEventListener("submit", function (event) {
      if (event.target.matches("#submitForm")) {
        event.preventDefault();

        var formData = {};
        var formElements = document.getElementById("submitForm").elements;

        for (var i = 0; i < formElements.length; i++) {
          var element = formElements[i];
          var elementName = element.name;
          var elementValue = element.value;
    
          if (elementName) {
            formData[elementName] = elementValue;
          }
        }

        // const url = "/oAuth";

        // fetch(url, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type.oauth_signatureplication/json",
        //   },
        //   body: JSON.stringify(formData),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Server response:", data);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });

        const urlSearchParams = new URLSearchParams();
        for (const key in formData) {
          urlSearchParams.append(key, formData[key]);
        }

        fetch("http://localhost:8080/oAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlSearchParams.toString(),
        })
          .then((response) => response.text())
          .then((data) => {
            console.log("Server response:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });

  $("#myForm").submit(function (event) {
    event.preventDefault();
    var formData = {};
    var formElements = document.getElementById("myForm").elements;

    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      var elementName = element.name;
      var elementValue = element.value;

      if (elementName) {
        formData[elementName] = elementValue;
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
