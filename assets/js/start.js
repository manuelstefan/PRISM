const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=44.4396&longitude=26.0963&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max&current_weather=true&timezone=auto";
    async function getData() {
        const response = await fetch(apiURL);
        const data = await response.json();
        const {temperature, windspeed, weathercode} = data;

        for (let i = 0; i < 8; i++) {
            if(data.daily.weathercode[i] === 0){
                data.daily.weathercode[i] = "Clear";
            }else if(data.daily.weathercode[i] === 1){
                data.daily.weathercode[i] = "Mostly Clear";
            }else if(data.daily.weathercode[i] === 2){
                data.daily.weathercode[i] = "Partly Coudy";
            }else if(data.daily.weathercode[i] === 3){
                data.daily.weathercode[i] = "Overcast";
            }else if(data.daily.weathercode[i] === 45 || data.daily.weathercode[i] === 48){
                data.daily.weathercode[i] = "Foggy";
            }else if(data.daily.weathercode[i] === 51 || data.daily.weathercode[i] === 53 || data.daily.weathercode[i] === 55){
                data.daily.weathercode[i] = "Drizzle";
            }else if(data.daily.weathercode[i] === 61 || data.daily.weathercode[i] === 63 || data.daily.weathercode[i] === 65){
                data.daily.weathercode[i] = "Rain";
            }else if(data.daily.weathercode[i] === 66 || data.daily.weathercode[i] === 67){
                data.daily.weathercode[i] = "Freezing Rain";
            }else if(data.daily.weathercode[i] === 71 || data.daily.weathercode[i] === 73 || data.daily.weathercode[i] === 75 || data.daily.weathercode[i] === 77){
                data.daily.weathercode[i] = "Snow";
            }else if(data.daily.weathercode[i] === 80 || data.daily.weathercode[i] === 81 || data.daily.weathercode[i] === 82){
                data.daily.weathercode[i] = "Rain Showers";
            }else if(data.daily.weathercode[i] === 85 || data.daily.weathercode[i] === 86){
                data.daily.weathercode[i] = "Snow Showers";
            }else if(data.daily.weathercode[i] === 95){
                data.daily.weathercode[i] = "Thunderstorm";
            }else if(data.daily.weathercode[i] === 96 || data.daily.weathercode[i] === 99){
                data.daily.weathercode[i] = "Hail Thunderstorm";
            }
        }
        document.getElementById("temp").textContent = data.current_weather.temperature + " °";
        document.getElementById("tempmin").textContent = data.daily.temperature_2m_min[0] + " °";
        document.getElementById("tempmax").textContent = data.daily.temperature_2m_max[0] + " °";
        document.getElementById("wind").textContent = data.current_weather.windspeed + " " + data.daily_units.windspeed_10m_max;
        document.getElementById("windmax").textContent = data.daily.windspeed_10m_max[0] + " " + data.daily_units.windspeed_10m_max;
        document.getElementById("precipitation").textContent = data.daily.precipitation_sum[0] + " mm";
        document.getElementById("precipitationhours").textContent = data.daily.precipitation_hours[0] + " h";
        document.getElementById("sunrise").textContent = data.daily.sunrise[0].slice(-5);
        document.getElementById("sunset").textContent = data.daily.sunset[0].slice(-5);
        
        /*Week Day & Icon */
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const day = new Date();
        document.getElementById("day").textContent = weekday[day.getDay()];

        /*const weekdayelements = document.getElementsByClassName("weather");
        for (let i = 0; i < 8; i++) {
            if(data.daily.weathercode[i] === "Clear"){
                weekdayelements[i]
            }
        }*/
    }
    getData();

function dosearch() {
    document.getElementById("search").addEventListener("keyup", function(event) {
        if (event.code === "Enter"){
            event.preventDefault();
            document.querySelector("form").submit();
        }; 
    });
}
function detectEngine() {
    var search = document.getElementById("search");
    var bookmark = document.getElementById("bookmark");
    var weather = document.getElementById("weather");
    var menuItems = document.querySelectorAll(".menu__button");
    var form = document.getElementById("form");

    const engine = [
        {
            name: "google",
            regex: /@g\s|\s@g|@google\s/ig,
            url: "http://www.google.com/search",
            parameter: "q"
        },{
            name: "duckduckgo",
            regex: /@d\s|\s@d|@ddg\s|@duck\s/ig,
            url: "https://duckduckgo.com/?t=ffab&q=",
            parameter: "q"
        },{
            name: "bing",
            regex: /@b\s|\s@b|@bing\s/ig,
            url: "https://www.bing.com/search?q=",
            parameter: "q"
        },{
            name: "wikipedia",
            regex: /@w\s|\s@w|@wiki\s|@wikipedia\s/ig,
            url: "http://www.wikipedia.org/search-redirect.php",
            parameter: "search"
        },{
            name: "youtube",
            regex: /@y\s|\s@y|@youtube\s|@yt\s/ig,
            url: "https://www.youtube.com/results?search_query=",
            parameter: "q"
        },{
            name: "mdn",
            regex: /@mdn\s|\s@mdn/ig,
            url: "https://developer.mozilla.org/en-US/search?q=",
            parameter: "q"
        },{
            name: "stackoverflow",
            regex: /@so\s|\s@so|@stack\s/ig,
            url: "https://stackoverflow.com/search?q=",
            parameter: "q"
        },{
            name: "dexonline",
            regex: /@dex\s|\s@dex/ig,
            url: "https://dexonline.ro/search.php",
            parameter: "cuv"
        }
    ]

    const bookmarktag = /!b\s|\s!b/ig;
    const weathertag = /!w/ig;

    let weatherHandler = weathertag.test(search.value);

    search.addEventListener("keyup", function(event) {
        for (let i = 0; i < engine.length; i++) {
            if (engine[i].regex.test(search.value)) {
                form.action = engine[i].url;
                search.setAttribute("name", engine[i].parameter);
                this.value = this.value.replace(engine[i].regex, "");
                search.placeholder = "search " + engine[i].name;
                searchEngine();
            } else if (bookmarktag.test(search.value)) {
                form.action = "javascript:void(0);";
                this.value = this.value.replace(bookmarktag, "");
                search.placeholder = "search bookmarks";
                bookmarkEngine();
            }
        }
        function bookmarkEngine() {
            bookmark.style.opacity = "100%";
            bookmark.style.display = "block";
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].value === "bookmarks") {
                    menuItems[i].classList.add("selected");
                } else {
                    menuItems[i].classList.remove("selected");
                }
            }
            const query = search.value.toLowerCase();
            const bookmarks = document.getElementsByClassName("bookmark__folder-item");
            for (let i = 0; i < bookmarks.length; i++) {
                const link = bookmarks[i];
                const linkText = link.innerText.toLowerCase();
                const linkHref = link.href;
                if (linkText.includes(query) || linkHref.includes(query)) {
                    link.classList.add("search-match");
                } else if ( query === "" || query === " ") {

                } else {
                    link.classList.remove("search-match");
                }
            }
        }
        function searchEngine() {
            bookmark.style.opacity = "0";
            bookmark.style.display = "none";
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].value === "search") {
                    menuItems[i].classList.add("selected");
                } else {
                    menuItems[i].classList.remove("selected");
                }
            }
        }
        if (weatherHandler === true) {
            weather.style.opacity = "100%";
            weather.style.display = "block";
        } else {
            weather.style.opacity = "0";
            weather.style.display = "none";
        } 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    menuStyle();
  });

function menuStyle() {
  var menuItems = document.querySelectorAll(".menu__button");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function() {
      for (var j = 0; j < menuItems.length; j++) {
        menuItems[j].classList.remove("selected");
      }
      this.classList.add("selected");
    });
  }

} 