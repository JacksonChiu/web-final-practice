const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

let weather_word;

$(function()
{
  $("#getLocationBtn").on("click", getLocation);
  $("[type='checkbox']").on("change",updateProgress);
  $(document).on("change", "[type='checkbox']", updateProgress);
  $(document).ready(function() {
    updateCheckboxStyles();
  });
  
});

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      
  } else {
      console.log("瀏覽器不支援地理定位功能。");
  }
}

function showPosition(position) {
     $("#result").empty();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("緯度：" + latitude);
    console.log("經度：" + longitude);

    let weatherAPI_URL="https://api.openweathermap.org/data/2.5/weather?";
    let weatherMapAPIKey="ece04d0449d3fe204f5251e1740499fe";
    $.getJSON(weatherAPI_URL,{
        lat:position.coords.latitude,
        lon:position.coords.longitude,
        appid:weatherMapAPIKey,
        units:'metric',
        lang:'zh_tw'
    })
    .done(function(data) {
        $("#result").append(`<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'></p>`);
        displayResults (data);
    })
    .fail(function(){ console.log("Error");})
    .always(function(){ console.log("Always");});
}










const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  weather_word = weather.weather[0].main;
  changecheckbox(weather_word);

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder (d) {
  let months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
/*//////////////////////////////////////////////////////////////////////*/
function updateProgress(){
  let hasChecked=0;
  for(let x=0;x<$("[type='checkbox']").length;x++){
      if($("[type='checkbox']")[x].checked){
          hasChecked+=1;
      }
  }
  // $("meter").attr("min",0);
  $("meter").attr("max", $("[type='checkbox']").length);
  $("progress").attr("max", $("[type='checkbox']").length);
  $("meter").attr("value", hasChecked);
  $("progress").attr("value", hasChecked);
  console.log(333333);
}
/*//////////////////////////////////////////////////////////////////////*/
function changecheckbox(aaa)
{
  $(".translucent-area").empty();
  if(aaa=="Clouds"||aaa=="Few clouds"||aaa=="Scattered clouds"||aaa=="Broken clouds")
  {
    $(".translucent-area").append(`<p style="font-size: 30px;">陰天方案:</p>`);
    $(".translucent-area").append(`<input id="A" type="checkbox"><span style="font-size: 25px;">雨傘或雨衣</span><br>`);
    $(".translucent-area").append(`<input id="B" type="checkbox"><span style="font-size: 25px;">防水鞋</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">防水包或塑膠袋</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">濕紙巾或毛巾</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">外套或薄型外衣</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">保溫杯</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">小零食</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手機</span><br>`);
    $(".translucent-area").append(`<br>完成進度條 :  <meter></meter>`)  
    updateCheckboxStyles();
  }
  else if(aaa=="Clear")
  {
    $(".translucent-area").append(`<p style="font-size: 30px;">晴天方案:</p>`);
    $(".translucent-area").append(`<input id="A" type="checkbox"><span style="font-size: 25px;">太陽帽或遮陽帽</span><br>`);
    $(".translucent-area").append(`<input id="B" type="checkbox"><span style="font-size: 25px;">太陽眼鏡</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">防曬霜</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">水瓶</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">輕便外套或罩衫</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手機</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">防蚊用品</span><br>`);
    $(".translucent-area").append(`<br>完成進度條 :  <meter></meter>`)  
    updateCheckboxStyles();
  }
  else if(aaa=="Shower rain"||aaa=="Rain"||aaa=="Thunderstorm")
  {
    $(".translucent-area").append(`<p style="font-size: 30px;">雨天方案:</p>`);
    $(".translucent-area").append(`<input id="A" type="checkbox"><span style="font-size: 25px;">雨傘或雨衣</span><br>`);
    $(".translucent-area").append(`<input id="B" type="checkbox"><span style="font-size: 25px;">防水鞋或膠鞋套</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">防水包或塑膠袋</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">濕紙巾或毛巾</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">替換衣物</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">袋子或塑膠袋</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">紀錄筆記</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手機</span><br>`);
    $(".translucent-area").append(`<br>完成進度條 :  <meter></meter>`)  
    updateCheckboxStyles();
  }
  else if(aaa=="Snow")
  {
    $(".translucent-area").append(`<p style="font-size: 30px;">雪天方案:</p>`);
    $(".translucent-area").append(`<input id="A" type="checkbox"><span style="font-size: 25px;">防寒外套和保暖衣物</span><br>`);
    $(".translucent-area").append(`<input id="B" type="checkbox"><span style="font-size: 25px;">防水雪靴或防滑鞋</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">雪帽</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">圍巾</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">替換衣物</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手套</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">防曬霜</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手機</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">太陽眼鏡</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">暖手包</span><br>`);
    $(".translucent-area").append(`<br>完成進度條 :  <meter></meter>`)  
    updateCheckboxStyles();
  }
  else if(aaa=="Mist"||aaa=="Smoke"||aaa=="Haze"||aaa=="Dust"||aaa=="Fog"||aaa=="Sand"||aaa=="Ash")
  {
    $(".translucent-area").append(`<p style="font-size: 30px;">陰霾天方案:</p>`);
    $(".translucent-area").append(`<input id="A" type="checkbox"><span style="font-size: 25px;">口罩</span><br>`);
    $(".translucent-area").append(`<input id="B" type="checkbox"><span style="font-size: 25px;">濕紙巾或面紙</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">室內活動計劃</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">圍巾</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">眼藥水</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手機</span><br>`);
    $(".translucent-area").append(`<br>完成進度條 :  <meter></meter>`)  
    updateCheckboxStyles();
  }
  else if(aaa=="Squall"||aaa=="Tornado")
  {
    $(".translucent-area").append(`<p style="font-size: 30px;">颱風天方案:</p>`);
    $(".translucent-area").append(`<input id="A" type="checkbox"><span style="font-size: 25px;">緊急求生包</span><br>`);
    $(".translucent-area").append(`<input id="B" type="checkbox"><span style="font-size: 25px;">避難包或行李箱</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">充足的飲用水和食物</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">應急照明工具</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">防護頭盔和防護眼鏡</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">手機</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">舒適的鞋子和衣物</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">應急聯繫方式</span><br>`);
    $(".translucent-area").append(`<input id="C" type="checkbox"><span style="font-size: 25px;">收音機</span><br>`);
    $(".translucent-area").append(`<br>完成進度條 :  <meter></meter>`)  
    updateCheckboxStyles();
  }
}

function updateCheckboxStyles() {
  $(".translucent-area input[type='checkbox']").addClass("custom-checkbox");
}