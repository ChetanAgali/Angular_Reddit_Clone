'use strict';

/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */
var app = angular.module('angNewsApp', ['ngRoute','ngResource','firebase']);
app.constant('URL', 'https://fiery-heat-8163.firebaseio.com/')
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'views/Posts.html',
		controller: 'PostsCtrl'
	})
	.when('/posts/:postID',{
		templateUrl: 'views/ShowPost.html',
		controller: 'PostViewCtrl'
	})
	.when('/register',{
		templateUrl: 'views/register.html',
		controller: 'AuthCtrl',
		resolve: {
			user: function(Auth){
				return Auth.resolveUser();
			}
		}
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'AuthCtrl',
		resolve: {
			user: function(Auth){
				return Auth.resolveUser();
			}
		}
	})
	.when('/users/:userid',{
		templateUrl: 'views/profile.html',
		controller: 'ProCtrl'
	})
	.otherwise({
		redirectTo: '/'
  });
}]);

