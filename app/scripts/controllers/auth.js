'use strict';
app.controller('AuthCtrl', ['$scope','Auth','$location',function($scope,Auth,$location){
	if (Auth.signedIn()) {
		$location.path('/');
	};

	var user = Auth.user;
	$scope.login = function(){
		Auth.login($scope.user).then(function(){
			$location.path('/');
		}, function(error){
			$scope.error = error.toString();
		});
	};

	$scope.register = function(){
		Auth.register($scope.user).then( function(){
			return Auth.login($scope.user).then(function(){
				user.username = $scope.user.username;
				return Auth.createProfile(user);				
			}).then(function(){
				$location.path('/');
			});
		}, function(error){
				$scope.error = error.toString();
			});
	};
	
}]);