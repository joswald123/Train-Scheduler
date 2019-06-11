
var config = {
  apiKey: "AIzaSyBEMg0AKSzac5bOMvNBxPyt4hSL99s-ssw",
  authDomain: "classexercisejune6th.firebaseapp.com",
  databaseURL: "https://classexercisejune6th.firebaseio.com",
  projectId: "classexercisejune6th",
  storageBucket: "",
  messagingSenderId: "628527832609",
  appId: "1:628527832609:web:c5fd08fe47eec7a1"
};


firebase.initializeApp(config);


var database = firebase.database();


$('#submitButton').on('click', function(event){
  event.preventDefault();
  
  var trainName = $("#trainName").val();
  var destinationPlace = $("#destination").val();
  var firstTrainTime = $("#firstTrain").val();
  var tFrecuency = $("#frecuency").val();
 
  // var div6 =$('<div>').text(firstTrainTime); 
  var div1 = $('<div>').text(trainName); 
  var div2 = $('<div>').text(destinationPlace); 
  var div3 = $('<div>').text(tFrecuency); 
  var div4 = $('<div>').text(moment(nextTrain).format("hh:mm")); 
  var div5 = $('<div>').text(tMinutesTillTrain); 
  var div6 =$('<span class="icon fa-edit"></span><span class="icon fa-eraser"></span>');

  console.log(trainName);


  $('#train_name').prepend(div1);
  $('#place').prepend(div2);
  $('#frecuencyMinutes').prepend(div3);
  $('#nextArrival').prepend(div4);
  $('#minutesAway').prepend(div5);
  $('#action').prepend(div6);



  // First Time (pushed back 1 year to make sure it comes before current tFrecuency)
  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrecuency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrecuency - tRemainder;
  console.log("Minutes away " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Next Arrival " + moment(nextTrain).format("hh:mm"));

  

  var traintoAdd = {
    trainName, 
    destinationPlace,
    firstTrainTime,
    tFrecuency,
    nextTrain,
    tMinutesTillTrain,
  
  }
  console.log(traintoAdd)


})


//Code for the video background
