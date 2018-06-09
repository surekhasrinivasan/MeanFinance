angular.module('cdfinance').controller('DetailController', DetailController);

function DetailController($http, $location,$routeParams) {
  var vm = this;
 var symbol=$routeParams.symbol;
 vm.symbol=symbol.toUpperCase();
   console.log($routeParams);
 
    vm.find = function(symbol) {
      $http.get("/api/stocks/" + symbol).then(function(response) {
       vm.isFound=true;
      var stockprice = response.data.price;
      vm.stockprice = stockprice;
      var  sector = response.data.sector;
      vm.sector = sector;
      console.log(response);
    }).catch(function(error) {
      if (error) {
        
        vm.error = error;
      }
     
    });
  };
  vm.find(vm.symbol);
}