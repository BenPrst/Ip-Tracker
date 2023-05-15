// Wait for the DOM to load before initializing the map
document.addEventListener("DOMContentLoaded", function () {
  // Create a map instance and specify the 'map' element as the container
  let mymap = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 6);

  // Add a tile layer to display the map tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data © OpenStreetMap contributors",
  }).addTo(mymap);

  // Add markers or perform other map-related operations as needed
  let button = document.getElementById("button");

  button.addEventListener("click", () => {
    let ip = document.getElementById("input").value;
    async function getInfos() {
      let url =
        "https://geo.ipify.org/api/v2/country,city?apiKey=at_3Dq6ZvbKJvqlluDed2skA0WUEZKVe&ipAddress=";
      try {
        let res = await fetch(url + `${ip}`);
        return await res.json();
      } catch (error) {
        console.log(error);
      }
    }
    async function tracker() {
      let infosIP = await getInfos();
      let coord = infosIP.location;
      let lat = coord.lat;
      let long = coord.lng;
      let country = coord.country;
      let city = coord.city;
      let timezone = coord.timezone;
      let isp = infosIP.isp;

      mymap.setView([lat, long], 13);

      document.getElementById("ipAdress").textContent = `${ip}`;
      document.getElementById("location").textContent =
        `${country} ,` + `${city}`;
      document.getElementById("timezone").textContent = `${timezone}`;
      document.getElementById("isp").textContent = `${isp}`;
    }

    tracker();
  });
});

// 85.201.62.18
