var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
	// $locationProvider.html5Mode(true);

var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        }
    };


	$routeProvider
		.when('/', {
			templateUrl: '/partial/main/home',
		})
		.when('/admin/users', {
			templateUrl: '/partial/admin/users-list',
			controller: 'UserListCtrl',
			resolve: routeRoleChecks.admin
		})
});

app.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
		if (rejection === 'not authorized') {
            $location.path('/');
        }
	})
});
