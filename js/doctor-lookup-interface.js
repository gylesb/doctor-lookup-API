var doctorSearch = require('../js/doctor-lookup.js').doctorSearch;

$(document).ready(function() {

  let searchDoctor = new doctorSearch();

  $('#search-symptom').submit(function(event){
    event.preventDefault();
    $('.symptom').empty();
    $('.doctorList').empty();
    let symptom = $("#symptom").val();
    console.log(symptom);
    $('.symptom').append("<div class='card'><h3><strong>Condition: </strong>" +symptom+"</h3></div>");
    searchDoctor.searchCondition(symptom);
  });

  $('#hide-symptoms').click(function(event) {
    event.preventDefault();
    $('.symptom').empty();
    $('.doctorList').empty();
  });

  $('#search-doctor').submit(function(event){
    event.preventDefault();
    $('.doctorList').hide();

    $('#doctorListNames').empty();
    let name = $("#doctor-name").val();
    console.log(name);
    searchDoctor.searchCondition(name);
  });
});
