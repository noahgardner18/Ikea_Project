let axios = require('axios');
var request = require('request');
const cheerio = require('cheerio');
const util = require('util')

var firstLink = 'https://www.ikea.com//us/en/catalog/products/S49061228/';
var secondLink = 'https://www.ikea.com/us/en/catalog/products/00306581/';

request('https://www.ikea.com//us/en/catalog/products/S49061228/#/S49061228', function (error, response, body) {
    const $ = cheerio.load(body);
    var unstrungName = $(body).find(".productName").text();
    var dropDownMenu = $(body).find("#selectionDropDownList1").text();
    var imageArrayUnfiltered = [];
    //var imagesForDifferentColors = imageArrayUnfiltered.push($(body).find("img[src$='_S3.JPG']"));
    //var imagesForDifferentColors = imageArrayUnfiltered.push($(body).find(".imageThumb > a > img")[0].text());


    var items = $(body).find("div[id='imageThumb_1']");
    console.log(items.length);

    var moneyPrice = $(body).find("span[id='price1']").text();
    var objectDescrip = $(body).find("div[id='salesArg']").text();
    var objectNumber = $(body).find("div[id='itemNumber']").text();
    function removeNL(s){ 
        return s.replace(/[\n\r\t]/g,""); 
      }
    var itemName = removeNL(unstrungName);
    var itemColors = removeNL(dropDownMenu);
    var itemPrice = removeNL(moneyPrice);
    var itemDescrip = removeNL(objectDescrip);
    var itemSerial= removeNL(objectNumber);

    itemColors = itemColors.replace(/  /g, ", ");
    itemColors = itemColors.replace(/   /g, ", ");
    itemColors = itemColors.replace(/    /g, ", ");

    itemPrice = itemPrice.replace(/ /g, "");
    itemPrice = itemPrice.replace(/  /g, "");
    itemPrice = itemPrice.replace(/   /g, "");
    itemPrice = itemPrice.replace(/    /g, "");

    itemDescrip = itemDescrip.replace(/  /g, "");
    itemDescrip = itemDescrip.replace(/   /g, "");
    itemDescrip = itemDescrip.replace(/    /g, "");
    itemDescrip = itemDescrip.replace(/     /g, "");
    itemDescrip = itemDescrip.replace(/      /g, "");
    itemDescrip = itemDescrip.replace(/                        /g, "");
   
    
    var product = {
        Name : itemName,
        Avalible_Colors : itemColors,
        Price : itemPrice,
        Description : itemDescrip,
        Item_Number : itemSerial,

    }
    //console.log(product)
    console.log(imageArrayUnfiltered)
})
