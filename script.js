
let weather = {
    API_KEY : "Your Api Key",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.API_KEY
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data) 
            );
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;
      const timeZone = data.timezone
      let time = new Date()
      let utc_time = time.getTime() + (time.getTimezoneOffset() * 60000)
      let local_time = new Date(utc_time + (1000)*timeZone)
    
      document.querySelector('.time').innerText = `${local_time.toLocaleString().toUpperCase()}`
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector('.sunrise').innerText = `Sunrise: ${window.moment(sunrise*1000).format('HH:mm a')}`
      document.querySelector('.sunset').innerText = `Sunset: ${window.moment(sunset*1000).format('HH:mm a')}`
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?landscape')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

// 05cfc6b58e66dc1c215c660ad12c19fa
  
  weather.fetchWeather("Mumbai");
