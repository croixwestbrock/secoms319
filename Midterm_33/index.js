fetch("./data.json")
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
        let price = myDrivers.drivers[i].price;
        let imgDriver = document.createElement("div");
        imgDriver.innerHTML = `<img src=${url} class="card-img-top" alt="..."></img>`;
        let titleDriver = document.createElement("h4");
        titleDriver.innerHTML = `<h4 class="card-text"> <strong>${name}</strong> - ${year}</h4>`
        let txtDriver = document.createElement("h5");
        txtDriver.innerHTML = `<h5 class="card-text">${price}</h5>`;

        if (myDrivers.drivers[i].name === "Callaway Mavrik") {
            imgDriver1.appendChild(imgDriver);
            txtDriver1.appendChild(titleDriver);
            txtDriver1.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "Wilson Staff DYNAPWR") {
            imgDriver2.appendChild(imgDriver);
            txtDriver2.appendChild(titleDriver);
            txtDriver2.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "Callaway Epic Speed") {
            imgDriver3.appendChild(imgDriver);
            txtDriver3.appendChild(titleDriver);
            txtDriver3.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "PING G425 Max") {
            imgDriver4.appendChild(imgDriver);
            txtDriver4.appendChild(titleDriver);
            txtDriver4.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "Callaway Paradym") {
            imgDriver5.appendChild(imgDriver);
            txtDriver5.appendChild(titleDriver);
            txtDriver5.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "TaylorMade SIM2") {
            imgDriver6.appendChild(imgDriver);
            txtDriver6.appendChild(titleDriver);
            txtDriver6.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "TaylorMade Stealth 2") {
            imgDriver7.appendChild(imgDriver);
            txtDriver7.appendChild(titleDriver);
            txtDriver7.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "Titleist TSi3") {
            imgDriver8.appendChild(imgDriver);
            txtDriver8.appendChild(titleDriver);
            txtDriver8.appendChild(txtDriver);
        } else if (myDrivers.drivers[i].name === "Titleist TSR2") {
            imgDriver9.appendChild(imgDriver);
            txtDriver9.appendChild(titleDriver);
            txtDriver9.appendChild(txtDriver);
        }
    }
}