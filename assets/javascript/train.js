
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

  var trainName = $("#trainName").val().trim();
  var destinationPlace = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrain").val().trim();
  var tFrecuency = $("#frecuency").val().trim();



  var traintoAdd = {
    trainName,
    destinationPlace,
    firstTrainTime,
    tFrecuency
  }


  database.ref().push(traintoAdd);


})

database.ref().on("value", function (snapshot) {
   console.log(snapshot.val())
  const data = snapshot.val();
  $("#trainResults").empty();
  // creating a new Row with input info
  for (let key in data) {
    console.log("I'm in the data loop")
    var $newRow = $('<tr>')
    $newRow.append($('<td>').text(data[key].trainName))
    $newRow.append($('<td>').text(data[key].destinationPlace))
    $newRow.append($('<td>').text(data[key].tFrecuency))
    console.log($newRow)
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
    $newRow.append($('<td>').append('<i class="fas fa-edit"></i>'))

    $("#trainResults").append($newRow);
  }

// update time

function updateTime () {
  
  const now = moment();
  const minutes = now.format("mm");

  console.log(minutes);

  
}

setInterval (updateTime, 1000);
updateTime();


// create an event listening for an icon. inside on.click function = delete function or edit funtion 

$(document).on('click', '.fa-eraser', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
  
});

// $(document).on('click', '.fa-edit', function (event) {
//   event.preventDefault();

//   $('td',$newRow).each(function() { $(this).html('<input type="text" value="' + $(this).html() + '" />'); 

  
//   });

// });


});