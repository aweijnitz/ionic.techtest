angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal) {
    console.log('AppCtrl created');


    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    /*
     // Create the login modal that we will use later
     $ionicModal.fromTemplateUrl('templates/scanModal.html', {
     scope: $scope
     }).then(function (modal) {
     $scope.modal = modal;
     });

     // Triggered in the login modal to close it
     $scope.closeScan = function () {
     $scope.modal.hide();
     };

     // Open the login modal
     $scope.scan = function () {
     $scope.modal.show();
     };

     // Perform the login action when the user submits the login form
     $scope.handleScan = function () {
     console.log('Scannned:', $scope.scanData);

     // Simulate a login delay. Remove this and replace with your login
     // code if using a login system
     $scope.closeScan();
     };
     */
  })
  .controller('StartCtrl', function ($scope, $ionicModal, $state, $cordovaBarcodeScanner) {
    console.log('Creating StartCtrl');
    var me = this;


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/scanModal.html', {
      scope: $scope
    }).then(function (modal) {
      console.log('Modal created');
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeScan = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.scan = function () {
      $scope.modal.show();
    };

    $scope.scanCode = function () {
      $cordovaBarcodeScanner
        .scan()
        .then(function (result) {
          me.scanResults = {
            code: result.text,
            format: result.format,
            scanCancelled: result.cancelled,
            scanSuccess: true
          };
          alert("Read code: "+result.text);
        }, function (error) {
          me.scanResults = {
            code: null,
            format: null,
            scanCancelled: false,
            scanSuccess: false,
            error: error
          };
          alert(error);
        });

      $scope.closeScan();

    };

    $scope.searchProduct = function () {
      console.log('GO TO SEARCH');
      $state.go('app.searchResult');
    };
  })

  .controller('SearchResultCtrl', function ($scope, $timeout) {
    console.log('SearchResultCtrl created');


    var partial = 50;
    var maxResults = 10 * partial;
    $scope.searchResult = [];
    $scope.maxResults = maxResults;
    $scope.currentMax = 0;
    $scope.partial = partial;
    // Create first search result
    for (var i = 0; i < maxResults; i++) {
      $scope.searchResult.push({
        image: 'img/canon/thumbs64/' + (i % 11) + '.png',
        name: 'Product ' + i,
        description: 'Product description here.',
        price: (100 + i)
      });
    }
    $scope.currentMax = partial;

    /*

     //PREP FOR INFINITE SCROLL

     $scope.loadMore = function() {
     console.log('Loading more');
     $timeout(function() {
     for(var i = 0; i < $scope.partial; i++) {
     $scope.searchResult.push({
     image: 'img/canon/thumbs64/'+(i%11)+'.png',
     name: 'Product '+ ($scope.currentMax + i),
     description: 'Product description here.',
     price: (100 + i)
     });
     }
     //                useItems(items);
     $scope.currentMax = $scope.currentMax + $scope.partial;
     $scope.$broadcast('scroll.infiniteScrollComplete');
     }, 2000);
     };

     $scope.$on('$stateChangeSuccess', function() {
     $scope.loadMore();
     });

     $scope.moreDataCanBeLoaded = function() {
     var result = $scope.searchResult.length >= $scope.maxResults ? false : true;
     result ? console.log("Can load more!") : console.log("NO MORE DATA TO LOAD");
     return result;
     };
     */

  })

  .controller('ScannerCtrl', function ($scope, $cordovaBarcodeScanner) {
    console.log('ScannerCtrl created');


  });
