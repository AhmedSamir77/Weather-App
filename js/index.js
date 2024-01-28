var myHttp = new XMLHttpRequest();
var allData = [];
var weather = document.querySelector("#weather");

// Get current date
const currentDate = new Date();

// Define arrays for days and months
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get day, month, and date
const currentDay = daysOfWeek[currentDate.getDay()];
const currentMonth = monthsOfYear[currentDate.getMonth()];
const dayOfMonth = currentDate.getDate();

// Calculate and display the next two days
const nextDay1 = new Date(currentDate);
nextDay1.setDate(currentDate.getDate() + 1);

const nextDay2 = new Date(currentDate);
nextDay2.setDate(currentDate.getDate() + 2);

function getData(search) {
  myHttp.open(
    "GET",
    `http://api.weatherapi.com/v1/forecast.json?key=5b0747fd21394ae48ed103001241501&q=${search}&days=7`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState === 4 && myHttp.status == 200) {
      allData = JSON.parse(myHttp.response);
      console.log(allData);
      displayData();
    }
  });
}

weather.addEventListener("change", function (e) {
  getData(e.target.value);
});

getData("cairo");

function displayData() {
  var cartona = "";

  cartona = ` <div class="col-md-4">
        <div class="inner mt-5">
          <div class="inner-title d-flex justify-content-between pt-2">
            <p class="ms-2">${currentDay}</p>
            <p class="me-2">${dayOfMonth + currentMonth}</p>
          </div>

          <div class="inner-content">
            <p class="ms-4 pt-4">${allData.location.name}</p>
            <div class="d-flex justify-content-around">
              <h1>${allData.current.temp_c}℃</h1>
              <img src="${
                allData.current.condition.icon
              }" class="w-25" alt="" />
            </div>
            <div class="pt-5">
              <small class="fs-6 ms-4">${allData.current.condition.text}</small>
            </div>

            <div class="d-flex justify-content-evenly pt-2">
              <p>${allData.current.humidity} %</p>
              <p>${allData.current.wind_kph} km/h</p>
              <p>${allData.current.wind_dir}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="inner mt-5">
          <div
            id="title"
            class="inner-title inner-spectial1 d-flex justify-content-center pt-2"
          >
            <p>${daysOfWeek[nextDay1.getDay()]}</p>
          </div>

          <div id="content" class="inner-content inner-special2">
            <div class="second pt-5">
              <img src="${
                allData.forecast.forecastday[0].day.condition.icon
              }" alt="" />
              <h1>${allData.forecast.forecastday[0].day.maxtemp_c} ℃</h1>
              <p>${allData.forecast.forecastday[0].day.mintemp_c} °</p>
            </div>
            <div class="d-flex justify-content-center">
              <small class="fs-6">${
                allData.forecast.forecastday[0].day.condition.text
              }</small>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="inner mt-5">
          <div class="inner-title d-flex justify-content-center pt-2">
            <p>${daysOfWeek[nextDay2.getDay()]}</p>
          </div>

          <div class="inner-content">
            <div class="second pt-5">
              <img src="${
                allData.forecast.forecastday[1].day.condition.icon
              }" alt="" />
              <h1>${allData.forecast.forecastday[1].day.maxtemp_c} ℃</h1>
              <p>${allData.forecast.forecastday[1].day.mintemp_c} °</p>
            </div>
            <div class="d-flex justify-content-center">
              <small class="fs-6">${
                allData.forecast.forecastday[1].day.condition.text
              }</small>
            </div>
          </div>
        </div>
      </div>
`;

  document.getElementById("weather-content").innerHTML = cartona;
}
