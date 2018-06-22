let axios = require('axios');
var request = require('request');
const cheerio = require('cheerio');
const util = require('util')
var RateLimiter = require('limiter').RateLimiter;
var beginURL = "https://www.ikea.com"

var limiter = new RateLimiter(1, 'second');

limiter.removeTokens(1, function(err, remainingRequests) {
  ikeaScrap('https://www.ikea.com/us/en/catalog/categories/departments/living_room/14885/');
});
//original link = https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/

//1st Request: Finds Page URLs
function ikeaScrap(url){
    request(url, function (error, response, body) {
        const $ = cheerio.load(body)
        var itemDetailsUnsorted = $("div[id^='item_']");
        var itemLinks = [];
        for(var i = 0; i < itemDetailsUnsorted.length; i++){
            var beginURL = "https://www.ikea.com"
            var URL = beginURL + $(itemDetailsUnsorted[i]).find("a").attr("href")
            secondRequest(URL)
        }
    });
}
function secondRequest(url){
    console.log('URL: ' + url);
    request(url, function (error, response, body) {
        if (error) {
            console.log('ERROR: ' + error.message);
        }
        const E3 = cheerio.load(body);
        //Name
        var unstrungName = E3(body).find(".productName").text();
        //Type
        var objectType = E3(body).find("span[class='productType']").text();
        //Color
        var dropDownMenu = E3(body).find("#selectionDropDownList1").text();
        //Price
        var moneyPrice = E3(body).find("span[id='price1']").text();
        //Item Number
        var objectNumber = E3(body).find("div[id='itemNumber']").text();
        //Description
        var objectDescrip = E3(body).find("div[id='custBenefit']").text();
        //Image
        var src = E3(body).find("#productImg").attr("src");

        function removeNL(s){ 
            return s.replace(/[\n\r\t]/g,""); 
        }

        var itemName = removeNL(unstrungName);
        var protoType = removeNL(objectType)
        var itemColors = removeNL(dropDownMenu);
        var itemPrice = removeNL(moneyPrice);
        var itemSerial= removeNL(objectNumber);
        var itemDescrip = removeNL(objectDescrip);

        protoType = protoType.split(",")
        itemType = protoType[0]

        itemColors = itemColors.replace(/  /g, ", ");
        itemColors = itemColors.replace(/   /g, ", ");
        itemColors = itemColors.replace(/    /g, ", ");
        itemColors = itemColors.split(', ');

        itemPrice = itemPrice.replace(/ /g, "");
        //itemPrice = itemPrice.replace(/  /g, "");
        //itemPrice = itemPrice.replace(/   /g, "");
        //itemPrice = itemPrice.replace(/    /g, "");

        itemDescrip = itemDescrip.replace(/  /g, "");
        itemDescrip = itemDescrip.replace(/   /g, "");
        itemDescrip = itemDescrip.replace(/    /g, "");
        itemDescrip = itemDescrip.replace(/     /g, "");
        itemDescrip = itemDescrip.replace(/      /g, "");
        itemDescrip = itemDescrip.replace(/                        /g, "");
        
        var product = {
            Name : itemName,
            Type : itemType,
            Price : itemPrice,
            Avalible_Colors : itemColors,
            Description : itemDescrip,
            Item_Number : itemSerial,
            Image : beginURL + src,
        }
        console.log(product)
    })
}