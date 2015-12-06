angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/scan.html', {
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
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('ScannerCtrl', function ($scope, $cordovaBarcodeScanner) {
        var me = this;
        $cordovaBarcodeScanner
            .scan()
            .then(function(result) {
                me.scanResults = {
                    code: result.text,
                    format: result.format,
                    scanCancelled: result.cancelled,
                    scanSuccess: true
                };
                alert(result.text);
            }, function(error) {
                vm.scanResults = {
                    code: null,
                    format: null,
                    scanCancelled: false,
                    scanSuccess: false,
                    error: error
                };
                alert(error);
            });

        $scope.closeScan();

    });
