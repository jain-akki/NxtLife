angular.module('yugma')

    // .value("baseUrl", "http://www.nxtlifetechnologies.com/school")
    .value("baseUrl", "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test")

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                /**
                 * Fixed selection box issues
                 */
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .run(function ($rootScope, $state, $localStorage, authService, $ionicPlatform, $cordovaStatusbar, customService) {

        $rootScope.$on("$stateChangeStart", function (event, next, nextParams, fromState) {
            
            if (!authService.isAuthenticated()) {
                if ((next.name !== "login.parents") && (next.name !== "login.managements")) {
                    event.preventDefault();
                    $state.go("login.parents");
                }
            }
            
        });

        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            $scope.isOnline = true;
        });

        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {

            var data = {
                template: "Please check your connection, make sure it's turn on"
            }

            customService._showAlert(data).then(function (res) {
            });

            $scope.isOnline = false;
        });

    })