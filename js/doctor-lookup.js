var apiKey = require('./../.env').apiKey;

var doctorLookup = function() {
  doctorLookup.prototype.searchCondition = function(symptom) {
      let promise = new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`;
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });

      promise.then(function(response) {
        let body = JSON.parse(response);
        console.log(body);
        let counter = 0;
        body.data.forEach(function(doctor) {
          console.log(doctor);
          let name = doctor.profile.first_name + " <strong>" + doctor.profile.last_name +"</strong>";
          console.log(name);

          $('.doctorList').append("<div class='card'><h5  class='docName'> Dr. "+name+"</h5><div class='docClinic' style id='docClinic"+counter+"'></div></div>");

          doctor.practices.forEach(function(clinic) {
            let clinicName = clinic.name;
            console.log(clinicName);

            let clinicAddress = clinic.visit_address.street +" "+clinic.visit_address.street2+", "+clinic.visit_address.city+" "+clinic.visit_address.zip;
            let clinicWebsite = clinic.website;
            let clinicPhone = clinic.phones;
            $("#docClinic"+counter).append("<p><strong>"+clinicName+"</strong><br>"+clinicAddress+"<br><a href=''"+clinicWebsite+"'>"+clinicWebsite+"</a></p><br>");
          });
          counter ++;
        });
      }, function(error) {
        $('.doctorList').text("There was an error processing your request. Please try again.");
      });
    }

    doctorLookup.prototype.searchName = function(name) {
      let promise = new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`;
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });

      promise.then(function(response) {
          let body = JSON.parse(response);
          console.log(body);
          let counter = 0;
          body.data.forEach(function(doctor) {
            console.log(doctor);
            let name = doctor.profile.first_name + " " + doctor.profile.last_name ;
            console.log(name);

            $('#doctorListNames').append("<div class='card'><h5 class='docName'>Dr. "+name+"</h5><div class='docClinic' id='docClinic"+counter+"'></div></div>");

            doctor.practices.forEach(function(clinic) {
              let clinicName = clinic.name;
              let clinicAddress = clinic.visit_address.street +" "+clinic.visit_address.street2+", "+clinic.visit_address.city+" "+clinic.visit_address.zip;
              let clinicWebsite = clinic.website;
              let clinicPhone = clinic.phones;
              $("#docClinic"+counter).append("<p><strong>"+clinicName+"</strong><br>"+clinicAddress+"<br><a href=''"+clinicWebsite+"'>"+clinicWebsite+"</a></p><br>");
            });

            counter ++;
            console.log(name);
            $('#doctorListNames').toggle();

          });
        }, function(error) {
          $('#doctorListNames').text("There was an error processing your request. Please try again.");
        });
    }
  }
