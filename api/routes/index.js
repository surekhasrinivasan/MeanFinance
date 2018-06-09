var express = require('express');
var router = express.Router();

var stocksCtrl = require('../controllers/stocks.controller.js');
var usersCtrl = require('../controllers/users.controller.js');
var boughtStocksCtrl = require('../controllers/boughtStocks.controller.js');
var stockPrice= require('../controllers/shared/stockPrice.js');

router
  .route('/users/:username/stocks')
  .get(boughtStocksCtrl.bStocksGetAll)

router
  .route('/users/:username/balance')
  .put(usersCtrl.updateBalance)
  
router
  .route('/users/:username/stocks/:symbol')
  .post(boughtStocksCtrl.bStocksBuy)
  
router
  .route('/users/:username/stocks/:symbol')
   .delete(boughtStocksCtrl.bStocksSellAll) // sell all stocks
  // .get(boughtStocksCtrl.bStocksGetOne) // currently no data. need for single display
  //.post(boughtStocksCtrl.bstockBuy)
 
  
router
  .route('/users/:username/deposit')
  .put(usersCtrl.depositFunds)
  
router
  .route('/users/:username')
  .get(usersCtrl.getUserBalance)

router
  .route('/stocks/')
  .get(stocksCtrl.stocksGetAll); 
  
router
  .route('/stocks/:symbol')
  .get(stocksCtrl.stocksGetPrice); // confirm stock validity and get price from API
  
router
  .route('/users/register')
  .post(usersCtrl.register);
  
router
  .route('/users/login')
  .post(usersCtrl.login);
  
module.exports = router;