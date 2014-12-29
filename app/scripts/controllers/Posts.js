'use strict';
// angular.module('angNewsApp')
// app.controller('PostsCtrl', ['$scope','Post','Postsfctry' function($scope, Post,Postsfctry){
app.controller('PostsCtrl', ['$scope','Post','$location','Auth',function($scope, Post,$location,Auth){	
//	$scope.posts = Post.get();//[];
	$scope.posts = Post.all;
	$scope.user = Auth.user;
	$scope.signedIn = Auth.signedIn;
	//console.log($scope.posts);
	//$scope.posts = Postsfctry();
	$scope.post = {
		url: 'http://', 
		title: ''
	};

	// $scope.submitPost = function(){
	// 	// $scope.posts.push($scope.post);
	// 	Post.create($scope.post).then( function(ref){

	// 		$location.path('/posts/' + ref.name());
	// 	});
	// 	//$scope.posts.$add($scope.post);
	// 	$scope.post = {url: 'http://', title: ''};
	// };

	// $scope.deletePost = function(index){
	// 	$scope.posts.splice(index, 1);

	// };
	$scope.deletePost = function(post){
		console.log(post);
		Post.delete(post);
	};

}]);

