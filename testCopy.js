let axios = require('axios');
var request = require('request');
const cheerio = require('cheerio');

//1st Request: Finds Page URLs
request('https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/', function (error, response, body) {
    const $ = cheerio.load(body)
    var itemDetailsUnsorted = $("div[id^='item_']");
    var itemLinks = [];
    var itemNames = [];
    var itemDescriptions = [];
    var itemTitles = [];
    for(var i = 0; i <itemDetailsUnsorted.length; i++){
        var beginURL = "https://www.ikea.com/"
        var endURL = itemLinks.push(beginURL + $(itemDetailsUnsorted[i]).find("a").attr("href"))
        var nameOfItem = itemNames.push($(itemDetailsUnsorted[i]).find(".productTitle").text())
        var descripOfItem = itemDescriptions.push($(itemDetailsUnsorted[i]).find(".productDesp").text())
        var nameAndDescrip = itemTitles.push(itemNames[i] + ", " + itemDescriptions[i])
    }
    console.log(itemLinks)

});
