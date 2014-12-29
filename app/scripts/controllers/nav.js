'use strict';

app.controller('NavCtrl', ['$scope','Post','$location','Auth', function($scope,Post,$location,Auth){
	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
	$scope.user = Auth.user;
	$scope.post = {url:'http://' , title:'', creator : '', creatorUID: ''};
	$scope.submitPost = function(){
		$scope.post.creator = $scope.user.profile.username;
		$scope.post.creatorUID = $scope.user.uid;
		Post.create($scope.post).then(function(ref){
			$location.path('/posts/' + ref.name());
			$scope.post = {url:'http://', title:''};
		});
	};
}]);