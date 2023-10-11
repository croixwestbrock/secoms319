fetch("./drivers.json")
    .then(response => response.json())
    .then(myDrivers => loadDrivers(myDrivers));

function loadDrivers(myDrivers) {
    
}