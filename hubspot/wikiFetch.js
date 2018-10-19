const fetch = require("node-fetch");
const https = require("https");
var str = "";
let outputText = "";

console.log("Hubspot Coding Challenge Solution");

const getTopicCount = async topic => {
  const requestUrl =
    "https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";
  callback = function(response) {
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      outputText = JSON.parse(str).parse.text["*"] + "";
      let counterr = outputText.split(topic).length - 1;
      console.log(counterr);
    });
  };
  await https.request(requestUrl + topic, callback).end();
};

getTopicCount("Pizza");
