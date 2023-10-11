fetch("./drivers.json")
    .then(response => response.json())
    .then(myDrivers => loadDrivers(myDrivers));

function loadDrivers(myDrivers) {
    var imgDriver1 = document.getElementById("imgDriver1"); 
    var imgDriver2 = document.getElementById("imgDriver2"); 
    var imgDriver3 = document.getElementById("imgDriver3"); 
    var imgDriver4 = document.getElementById("imgDriver4");
    var imgDriver5 = document.getElementById("imgDriver5");
    var imgDriver6 = document.getElementById("imgDriver6");
    var imgDriver7 = document.getElementById("imgDriver7");
    var imgDriver8 = document.getElementById("imgDriver8");
    var imgDriver9 = document.getElementById("imgDriver9");

    var txtDriver1 = document.getElementById("txtDriver1");
    var txtDriver2 = document.getElementById("txtDriver2");
    var txtDriver3 = document.getElementById("txtDriver3");
    var txtDriver4 = document.getElementById("txtDriver4");
    var txtDriver5 = document.getElementById("txtDriver5");
    var txtDriver6 = document.getElementById("txtDriver6");
    var txtDriver7 = document.getElementById("txtDriver7");
    var txtDriver8 = document.getElementById("txtDriver8");
    var txtDriver9 = document.getElementById("txtDriver9");
    for (var i = 0; i < myDrivers.drivers.length; i++) {
        let name = myDrivers.drivers[i].name;
        let year = myDrivers.drivers[i].year;
        let url = myDrivers.drivers[i].url;
        let imgDriver = document.createElement("div");
        imgDriver.innerHTML = `<img src=${url} class="card-img-top" alt="..."></img>`;
        let txtDriver = document.createElement("p");
        txtDriver.innerHTML = `<p class="card-text"> <strong>${title}</strong>, ${year}</p>`;

        if (myDrivers.drivers[i].name === "mavrik") {
            imgDriver1.appendChild(imgDriver);
            txtDriver1.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "dynapower") {
            imgDriver2.appendChild(imgDriver);
            txtDriver2.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "epicspeed") {
            imgDriver3.appendChild(imgDriver);
            txtDriver3.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "g425max") {
            imgDriver4.appendChild(imgDriver);
            txtDriver4.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "paradym") {
            imgDriver5.appendChild(imgDriver);
            txtDriver5.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "sim2") {
            imgDriver6.appendChild(imgDriver);
            txtDriver6.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "stealth2") {
            imgDriver7.appendChild(imgDriver);
            txtDriver7.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "tsi3") {
            imgDriver8.appendChild(imgDriver);
            txtDriver8.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "tsr2") {
            imgDriver9.appendChild(imgDriver);
            txtDriver9.appendChild(txtDriver);
        }
    }
}