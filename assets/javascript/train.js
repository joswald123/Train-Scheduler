

var config = {
  apiKey: "AIzaSyDzyUkYGSaUmyj5FOKC0NQcvGz-1d1jWxg",
  authDomain: "train-homework-c2836.firebaseapp.com",
  databaseURL: "https://train-homework-c2836.firebaseio.com",
  projectId: "train-homework-c2836",
  storageBucket: "train-homework-c2836.appspot.com",
  messagingSenderId: "345214794083",
  appId: "1:345214794083:web:801482ba8c6e0801"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destinationPlace = "";
var tFrecuency = "";
var nextTrain = "";
var tMinutesTillTrain = "";

// submited info by a button 

$('#submitButton').on('click', function (event) {
  event.preventDefault();

  let trainName = $("#trainName").val().trim();
  let destinationPlace = $("#destination").val().trim();
  let firstTrainTime = $("#firstTrain").val().trim();
  let tFrecuency = $("#frecuency").val().trim();

  const key = database.ref().push().key
  console.log(key)

  let traintoAdd = {
    trainName,
    destinationPlace,
    firstTrainTime,
    tFrecuency,
    key
  }
  const updates = {}
  updates[key] = traintoAdd

  database.ref().update(updates);


})
function displayUpdate(data){
  for (let key in data) {
    console.log(data.key)
   
    var $newRow = $('<tr>')
    $newRow.append($('<td>').text(data[key].trainName).addClass(data[key].key))
    $newRow.append($('<td>').text(data[key].destinationPlace).addClass(data[key].key))
    $newRow.append($('<td>').text(data[key].tFrecuency).addClass(data[key].key))

   
    // Moment.js functions: 

    // First Time (pushed back 1 year to make sure it comes before current tFrecuency)
    var firstTimeConverted = moment(data[key].firstTrainTime, "HH:mm").subtract(1, "years");
    

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % data[key].tFrecuency;

    // Minute Until Train
    var tMinutesTillTrain = data[key].tFrecuency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    $newRow.append($('<td>').text(nextTrain))
    $newRow.append($('<td>').text(tMinutesTillTrain))
    $newRow.append($('<td>').append('<i class="fas fa-eraser"></i>'))
    $newRow.append($('<td>').append(`<i class="fas fa-edit" data-id=${data[key].key}></i>`))

    $("#trainResults").append($newRow);
  }
}
database.ref().on("value", function (snapshot) {
   console.log(snapshot.val())
  const data = snapshot.val();
  $("#trainResults").empty();

  // creating a new Row with input info
  
displayUpdate(data); 

// update time


setInterval(function(){
  $("#trainResults").empty();
  database.ref().once('value', function(snapshot){
    const data = snapshot.val(); 
    displayUpdate(data); 
  })
},60000)

// create an event listening for an icon. inside on.click function = delete function or edit funtion 

$(document).on('click', '.fa-eraser', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
  
});

$(document).on('click', '.fa-edit', function (event) {
  event.preventDefault();
  const id = $(this).attr("data-id")

  $(`td.${id}` ).each(function() { $(this).html('<input type="text""' + $(this).html() + '" />'); 

  
  });

});


});