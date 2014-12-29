'use strict';

app.controller('PostViewCtrl',['$scope','$routeParams','Post', 'Auth',function($scope,$routeParams,Post,Auth){
	$scope.post = Post.get($routeParams.postID);
	$scope.comments = Post.comments($routeParams.postID);

	$scope.user = Auth.user;
	$scope.signedIn = Auth.signedIn;

	$scope.addComments = function(){
		if (!$scope.commentText || $scope.commentText === '') {
			return;
		}
		var comment = {
			text: $scope.commentText,
			creator: $scope.user.profile.username,
			creatorUID: $scope.user.uid
		};
		$scope.comments.$add(comment);
		$scope.commentText = '';
	};

	$scope.deleteComments = function(comment){
		$scope.comments.$remove(comment);
	};
}]);