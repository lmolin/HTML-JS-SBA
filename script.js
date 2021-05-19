/* Program: script.js
   Author: Louisa Molin
   contains functions for reading and manipulating inputs from form.html.
   console.log used to test that functions are called correctly. */

console.log("connected to script.js");

/* validateFields returns true if all required inputs are filled,
   false if not. */
function validateFields() {
    console.log("validateFields called");
    var allFieldsValid = true;

    var requiredList = document.getElementsByClassName("required");

    for (field of requiredList) {

        if (field.value == "") {
            allFieldsValid = false;
            alert("Please fill all required fields.");
            break;
        }
    }

    console.log("all fields valid:" + allFieldsValid);
    return allFieldsValid;
}

/* Receive values from form and calculates emissions,
   then passes them as query string */
var url;

function getValues() {

    if (validateFields()) {
        console.log("getValues was called");

        //get general values
        var fName = document.getElementById("first-name").value;
        var lName = document.getElementById("last-name").value;
        var email = document.getElementById("email").value;

        //get electricity values
        var userState = document.getElementById("state-select").value;
        var electricity = document.getElementById("energy").value;

        //get fuel type
        if (document.getElementById("gasoline").checked) {
            var fuelType = 0;
        }
        else if (document.getElementById("diesel").checked) {
            var fuelType = 1;
        }

        //get gas mileage
        var userMileage = document.getElementById("mileage").value;

        //get miles driven
        var milesDriven = document.getElementById("distance").value;

        //calculate emissions
        var eEmissions = getElectricityEmissions(userState, electricity);
        var cEmissions = getCarEmissions(userMileage, milesDriven, fuelType);

        //create query string
        url = "final.html" + "?name=" + fName + "&eEm=" + eEmissions + "&cEm=" + cEmissions; 

        //enable next button
        window.open(url, "_self");
    }
}


/* key: state name
   value: average grams of CO2 per kWh */
let stateCarbonMap = new Map ([
    ['Alabama', 511], ['Alaska', 493], ['Arizona', 496], ['Arkansas', 538], ['California', 232],
    ['Colorado', 825], ['Connecticut', 279], ['Delaware', 698], ['District of Columbia', 1028],
    ['Florida', 557], ['Georgia', 583], ['Hawaii', 700], ['Idaho', 60], ['Illinois', 487],
    ['Indiana', 908], ['Iowa', 737], ['Kansas', 754], ['Kentucky', 940], ['Louisiana', 508],
    ['Maine', 219], ['Maryland', 612], ['Massachusetts', 482], ['Michigan', 637], ['Minnesota', 591],
    ['Mississippi', 510], ['Missouri', 832], ['Montana', 678], ['Nebraska', 660], ['Nevada', 478],
    ['New Hampshire', 253], ['New Jersey', 280], ['New Mexico', 821], ['New York', 287],
    ['North Carolina', 536], ['North Dakota', 887], ['Ohio', 800], ['Oklahoma', 671], ['Oregon', 183],
    ['Pennsylvania', 532], ['Rhode Island', 454], ['South Carolina', 413], ['South Dakota', 352],
    ['Tennessee', 518], ['Texas', 577], ['Utah', 830], ['Vermont', 1], ['Virginia', 471],
    ['Washington', 136], ['West Virginia', 893], ['Wisconsin', 707], ['Wyoming', 948],
]);

/* populate state select box on load of form page */
function fillStateSelect() {
    for (var state of stateCarbonMap.keys()) {
        var node = document.createElement("option");
        var option = document.createTextNode(state);
        node.appendChild(option);
        document.getElementById("state-select").appendChild(node);
    }
}

/* Electricity emissions calculation */

function getElectricityEmissions(state, kwh) {
    //emissions calculated in grams CO2 per kWh
    var grams = stateCarbonMap.get(state);
    var electricityEmissions = grams * kwh;
    return electricityEmissions;
}

/* Car emissions calculation  */

function getCarEmissions(mileage, distance, fuelType) {
    if (fuelType == 1) {
        // diesel powered cars produce 10100 g CO2 per gallon
        var carEmissions = distance * (10100 / mileage);
    } else {
        //gasoline powered cars produce 8800 g CO2 per gallon
        var carEmissions = distance * (8800 / mileage);
    }

    return carEmissions;
}