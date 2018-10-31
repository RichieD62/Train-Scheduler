



var database = firebase.database();  
var trainName = "";
var destination = "";
//var firstTime = moment("HH:mm");
var firstTime = "";
var frequency = "";

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
        //var empStart = moment.unix(snapshot).format("HH:mm")
        console.log(tmp);

        //var nextArrival = firstTime + frequency;
        //var minutesAway = nextArrival - currentTime;
        //    
        var tRow = $("<tr>"); 
            var trainNameTd = $("<td>").html(tmp.trainName);
            var destinationTd = $("<td>").html(tmp.destination);
            var firstTimeTd = $("<td>").html(tmp.firstTime);
            //var empStart = $("<td>").html(tmp.firstTime);
            var frequencyTd = $("<td>").html(tmp.frequency);
            var nextArrivalTd = $("<td>").html("");
            var minutesAwayTd = $("<td>").html("");

        tRow.append(trainNameTd, destinationTd, firstTimeTd, frequencyTd, nextArrivalTd, minutesAwayTd);
        $("#myTable").append(tRow);
        
    })




});