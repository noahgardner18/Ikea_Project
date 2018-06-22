const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cheerio = require('cheerio');
const options = {}
JSDOM.fromURL("https://www.ikea.com//us/en/catalog/products/S49061228/#/S89061226", options).then(dom => {
  const $ = cheerio.load(dom.serialize());
  var imagesArray = []
  var imageFinder = imagesArray.push($(dom.serialize()).find("img[src$='.JPG']"));
  //console.log(imagesArray)
  //console.log(imagesArray.length);
  //console.log(imagesArray[0].attr('src'))
  console.log(dom.serialize())
});
