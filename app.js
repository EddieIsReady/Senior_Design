
let gpsWatchId = null;

function followMode() {
  document.getElementById("mode").textContent =
    "Follow Me (Demo)";
}

function navigationMode() {
  document.getElementById("mode").textContent =
    "Point A to B (Demo)";
}

function stopRobot() {
  stopGPS();

  document.getElementById("mode").textContent =
    "Stopped (Demo)";
}

function startGPS() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  if (gpsWatchId !== null) {
    return;
  }

  document.getElementById("gpsStatus").textContent =
    "Requesting GPS location...";

  gpsWatchId = navigator.geolocation.watchPosition(
    function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      document.getElementById("latitude").textContent =
        latitude.toFixed(6);

      document.getElementById("longitude").textContent =
        longitude.toFixed(6);

      document.getElementById("accuracy").textContent =
        accuracy.toFixed(1) + " meters";

      document.getElementById("gpsStatus").textContent =
        "GPS active";
    },

    function(error) {
      document.getElementById("gpsStatus").textContent =
        "GPS error: " + error.message;
    },

    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 15000
    }
  );
}

function stopGPS() {
  if (gpsWatchId !== null) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }

  document.getElementById("gpsStatus").textContent =
    "GPS stopped";
}
