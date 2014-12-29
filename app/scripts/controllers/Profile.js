'use strict';

app.controller('ProCtrl', ['Profile','$scope','$routeParams' function(Profile,$scope,$routeParams){
	var uid = $routeParams.userId;

	$scope.profile =Profile.get(uid);
	Profile.getPosts(uid).then(function(posts){
		$scope.posts = posts;
	});
	
}]);