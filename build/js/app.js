(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "9d88a13844787facf1d689f85bb66057"

},{}],2:[function(require,module,exports){
"use strict";

var apiKey = require('./../.env').apiKey;

var doctorLookup = function doctorLookup() {
  doctorLookup.prototype.searchCondition = function (symptom) {
    var promise = new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + symptom + "&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=" + apiKey;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function (response) {
      var body = JSON.parse(response);
      console.log(body);
      var counter = 0;
      body.data.forEach(function (doctor) {
        console.log(doctor);
        var name = doctor.profile.first_name + " <strong>" + doctor.profile.last_name + "</strong>";
        console.log(name);

        $('.doctorList').append("<div class='card'><h5  class='docName'> Dr. " + name + "</h5><div class='docClinic' style id='docClinic" + counter + "'></div></div>");

        doctor.practices.forEach(function (clinic) {
          var clinicName = clinic.name;
          console.log(clinicName);

          var clinicAddress = clinic.visit_address.street + " " + clinic.visit_address.street2 + ", " + clinic.visit_address.city + " " + clinic.visit_address.zip;
          var clinicWebsite = clinic.website;
          var clinicPhone = clinic.phones;
          $("#docClinic" + counter).append("<p><strong>" + clinicName + "</strong><br>" + clinicAddress + "<br><a href=''" + clinicWebsite + "'>" + clinicWebsite + "</a></p><br>");
        });
        counter++;
      });
    }, function (error) {
      $('.doctorList').text("There was an error processing your request. Please try again.");
    });
  };

  doctorLookup.prototype.searchName = function (name) {
    var promise = new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      var url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=" + apiKey;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function (response) {
      var body = JSON.parse(response);
      console.log(body);
      var counter = 0;
      body.data.forEach(function (doctor) {
        console.log(doctor);
        var name = doctor.profile.first_name + " " + doctor.profile.last_name;
        console.log(name);

        $('#doctorListNames').append("<div class='card'><h5 class='docName'>Dr. " + name + "</h5><div class='docClinic' id='docClinic" + counter + "'></div></div>");

        doctor.practices.forEach(function (clinic) {
          var clinicName = clinic.name;
          var clinicAddress = clinic.visit_address.street + " " + clinic.visit_address.street2 + ", " + clinic.visit_address.city + " " + clinic.visit_address.zip;
          var clinicWebsite = clinic.website;
          var clinicPhone = clinic.phones;
          $("#docClinic" + counter).append("<p><strong>" + clinicName + "</strong><br>" + clinicAddress + "<br><a href=''" + clinicWebsite + "'>" + clinicWebsite + "</a></p><br>");
        });

        counter++;
        console.log(name);
        $('#doctorListNames').toggle();
      });
    }, function (error) {
      $('#doctorListNames').text("There was an error processing your request. Please try again.");
    });
  };
};

},{"./../.env":1}],3:[function(require,module,exports){
'use strict';

var doctorSearch = require('../js/doctor-lookup.js').doctorSearch;

$(document).ready(function () {

  var searchDoctor = new doctorSearch();

  $('#search-symptom').submit(function (event) {
    event.preventDefault();
    $('.symptom').empty();
    $('.doctorList').empty();
    var symptom = $("#symptom").val();
    console.log(symptom);
    $('.symptom').append("<div class='card'><h3><strong>Condition: </strong>" + symptom + "</h3></div>");
    searchDoctor.searchCondition(symptom);
  });

  $('#hide-symptoms').click(function (event) {
    event.preventDefault();
    $('.symptom').empty();
    $('.doctorList').empty();
  });

  $('#search-doctor').submit(function (event) {
    event.preventDefault();
    $('.doctorList').hide();

    $('#doctorListNames').empty();
    var name = $("#doctor-name").val();
    console.log(name);
    searchDoctor.searchCondition(name);
  });
});

},{"../js/doctor-lookup.js":2}]},{},[3]);
