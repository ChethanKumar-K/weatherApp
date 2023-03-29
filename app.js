const express = require('express');
const bodyParser = require('body-Parser');

// requiring https module
const https = require('https');
const { urlencoded } = require('body-Parser');

//intialize new express app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function (req,res) {
  
  const query = req.body.cityName;
  const apiKey = "2869b5fc3b51e5b6982960bbfad04088";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<h1>Temperature in "+ query +" is " + temp + "degree Celsius</h1>")
      res.write("<p>Weather is " + weatherDescription + "</p>");
      res.write("<img src=" + imgUrl +">");
      res.send();
    });

  });
});


app.listen(3000,function () {
  console.log('Server listening at port 3000');
});