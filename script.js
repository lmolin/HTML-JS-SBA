/* check that all required inputs are filled */

function validateFields() {
    var allFieldsValid = true;

    var requiredList = document.getElementsByClassName("required");

    for (field of requiredList) {

        if (field.value == "") {
            allFieldsValid = false;
            break;
        }
    }

    return allFieldsValid;
}

/* Receive values from form */
var fName;
var lName;
var email;
var userState;
var electricity;
var fuelType;
var userMileage;
var milesDriven;

function getValues() {

    if (allFieldsValid()) {
        //get general values
        fName = document.getElementById("first-name").value;
        lName = document.getElementById("last-name").value;
        email = document.getElementById("email").value;

        //get electricity values
        userState = document.getElementById("state-select").value;
        electricity = document.getElementById("energy").value;

        //get fuel type
        if (document.getElementById("gasoline").checked) {
            fuelType = 0;
        }
        else if (document.getElementById("diesel").checked) {
            fuelType = 1;
        }

        //get gas mileage
        userMileage = document.getElementById("mileage").value;

        //get miles driven
        milesDriven = document.getElementById("distance").value;

        alert("success!");
    }
    else {alert("Please fill out all required fields.");}
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

var mileage;
var distance;
var fuelType;

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