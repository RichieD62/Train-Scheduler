



var database = firebase.database();  
var trainName = "";
var destination = "";
//var firstTime = moment("HH:mm");
var firstTime = "";
var frequency = "";
var tMinutesTillTrain = "";
var nextTrainFormatted = "";


$(document).ready(function(){

    $("#submit-button").on("click", function(){
        event.preventDefault();

        trainName = $("#input-name").val().trim();
        destination = $("#input-destination").val().trim();
        firstTime = $("#input-firstTime").val().trim();
        //firstTime = ($("#input-firstTime").val().trim(), "HH:mm").format("X");
        frequency = $("#input-frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        });
    });

    database.ref().on("child_added", function(snapshot){
        var tmp = snapshot.val();
        //var trainStart = moment.unix(snapshot).format("HH:mm")
        console.log(tmp);
        convertTime(tmp.frequency, tmp.firstTime);
        //var nextArrival = firstTime + frequency;
        //var minutesAway = nextArrival - currentTime;
        //    
        var tRow = $("<tr>"); 
            var trainNameTd = $("<td>").html(tmp.trainName);
            var destinationTd = $("<td>").html(tmp.destination);
            var firstTimeTd = $("<td>").html(tmp.firstTime);
            //var empStart = $("<td>").html(tmp.firstTime);
            var frequencyTd = $("<td>").html(tmp.frequency);
            var nextArrivalTd = $("<td>").html(nextTrainFormatted);
            var minutesAwayTd = $("<td>").html(tMinutesTillTrain);

        tRow.append(trainNameTd, destinationTd, firstTimeTd, frequencyTd, nextArrivalTd, minutesAwayTd);
        $("#myTable").append(tRow);
        
    })

var convertTime = function(tFrequency, firstTime) {
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Next Train Formatted
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

};

});