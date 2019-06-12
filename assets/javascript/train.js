
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
    var tFrecuency = 0;
    var nextTrain = "";
    var tMinutesTillTrain = "";



$('#submitButton').on('click', function(event){
  event.preventDefault();
  
  var trainName = $("#trainName").val().trim();
  var destinationPlace = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrain").val().trim();
  var tFrecuency = $("#frecuency").val().trim();

  var traintoAdd = {
    trainName, 
    destinationPlace,
    firstTrainTime,
    tFrecuency,
    nextTrain,
    tMinutesTillTrain,
  
  }
  

  // Moment.js functions: 

  // First Time (pushed back 1 year to make sure it comes before current tFrecuency)
  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
 
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
  // Time apart (remainder)
  var tRemainder = diffTime % tFrecuency;
  
  // Minute Until Train
  var tMinutesTillTrain = tFrecuency - tRemainder;
  
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
 


  var newRow = $('<tr>').append(

    $('<td>').text(trainName),
    $('<td>').text(destinationPlace),
    $('<td>').text(tFrecuency),
    $('<td>').text(nextTrain),
    $('<td>').text(tMinutesTillTrain),
    $('<td>').append('<i class="fas fa-eraser"></i>'),
    $('<td>').append('<i class="fas fa-edit"></i>'),

  
 
  )

    $('.table').append(newRow)
    
    
   
    database.ref().set({
     trainName: trainName,
     destinationPlace: destinationPlace,
     tFrecuency: tFrecuency,
     nextTrain: nextTrain,
     tMinutesTillTrain: tMinutesTillTrain,
    });


})

database.ref().on("value", function(snapshot) {

  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destinationPlace);
  console.log(snapshot.val().tFrecuency);
  console.log(snapshot.val().nextTrain);
  console.log(snapshot.val().tMinutesTillTrain);

 
  $(".Train_Name").text(snapshot.val().trainName);
  
  // $(".Train_Name").text(snapshot.val().destinationPlace);
  // $(".Train_Name").text(snapshot.val().tFrecuency);
  // $(".Train_Name").text(snapshot.val().nextTrain);
  // $(".Train_Name").text(snapshot.val().tMinutesTillTrain);

}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    function funcMain()
    {
      $("#add_row").on('click',newRowTable);
    
      $("loans_table").on('click','.fa-eraser',deleteProduct);
      $("loans_table").on('click','.fa-edit',editProduct);
    
      $("body").on('click',".fa-eraser",deleteProduct);
      $("body").on('click',".fa-edit",editProduct);
    }
    
    
    function functionDeleteInfo(){
      //Obteniendo la fila que se esta eliminando
      var a=this.parentNode.parentNode;
      //Obteniendo el array de todos loe elementos columna en esa fila
      //var b=a.getElementsByTagName("td");
      var cantidad=a.getElementsByTagName("td")
      console.log(a);
    
      $(this).parent().parent().fadeOut("slow",function(){$(this).remove();});
    }
    
    
    function deleteProduct(){
      //Guardando la referencia del objeto presionado
      var _this = this;
      //Obtener las filas los datos de la fila que se va a elimnar
      var array_fila=getRowSelected(_this);
    
      //Restar esos datos a los totales mostrados al finales
      //calculateTotals(cantidad, precio, subtotal, impuesto, totalneto, accioneliminar)
      calculateTotals(array_fila[3],array_fila[4],array_fila[5],array_fila[6],array_fila[7],2)
    
      $(this).parent().parent().fadeOut("slow",function(){$(this).remove();});
    }
    
    
    function editProduct(){
      var _this = this;;
      var array_fila=getRowSelected(_this);
      console.log(array_fila[0]+" - "+array_fila[1]+" - "+array_fila[2]+" - "+array_fila[3]+" - "+array_fila[4]+" - "+array_fila[5]+" - "+array_fila[6]+" - "+array_fila[7]);
      //Codigo de editar una fila lo pueden agregar aqui
    } 

    
// create an event listening for an icon. inside on.click function = delete function or edit funtion 
