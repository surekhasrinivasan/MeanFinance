var https = require('https');

// Build the full lookup string for AlphaAdvantage
function GetAPIurl() {

  var fs = require('fs');
  const keyFile = 'api/data/AA.key'; // location of user key
  var localAPIkey = '4731UK5N1KC5G551'; //use my personal key by default

  const myKey = fs.readFile(keyFile, 'utf8', function(err, data) {
    if (err) {
      console.log(`Can't read AlphaAdvantage key from ${keyFile} - using default key.`);
      console.log('Please get your personal key at AlphaAdvantage.co');
    }
    else {
      console.log(`Read AlphaAdvantage key from ${keyFile} OK`);
      localAPIkey = myKey; //read line from file
    }
  });

  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${localAPIkey}&outputsize=compact`;
}

const _apiUrl = GetAPIurl();

module.exports.getPrice = function(req, res, symbol) {

  var url = _apiUrl + "&symbol=" + symbol;

  // console.log(url);

  var request = https.get(url, function(response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "",
      data,
      route;

    response.on("data", function(chunk) {
      buffer += chunk;
    });

    response.on("end", function(err) {
      if (err) {
        res
          .status(500)
          .json(err);
      }
      else {
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);
        // console.log(data);
        var stockData = data['Time Series (Daily)'];
        var keys = Object.keys(stockData);
        var price = parseFloat(stockData[keys[0]]['4. close']);
        res
          .status(200)
          .json({ "price": price });
      }
    });
  });
};

module.exports.returnPrice = function(symbol) {
  var url = _apiUrl + "&symbol=" + symbol;
  //var _apiKey = "QF6UAP0QGES2OVFF";
  //var url = _apiUrl +  symbol+"&apikey="+_apiKey;
  var price;
  var request = https.get(url, function(response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "",
      data,
      route;

    response.on("data", function(chunk) {
      buffer += chunk;
    });

    response.on("end", function(err) {
      if (err) {
        return err;
      }
      else {
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);

        var stockData = data['Time Series (Daily)'];
        var keys = Object.keys(stockData);
        //console.log(parseFloat(stockData[keys[0]]['4. close']));
        price = parseFloat(stockData[keys[0]]['4. close']);

        return parseFloat(stockData[keys[0]]['4. close']);
      }
    });
  });

};
