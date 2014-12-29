'use strict';

app.factory('Auth', ['$rootScope','URL', '$firebaseAuth','$firebase',function($rootScope, URL,$firebaseAuth,$firebase){
	var ref = new Firebase(URL);	
	var auth = $firebaseAuth(ref);
	var Auth = {
		register: function(user){
			return auth.$createUser(
				user.email,
				user.password
			);
		},
		createProfile: function(user){
			var profile = {
				username : user.username,
			//	md5_hash : user.md5_hash 
			};
			// profile.username = user.name;
			// profile.md5_hash = user.md5_hash;
			var profileRef = $firebase(ref.child('profile'));
			return profileRef.$set(user.uid, profile);
		},
		login: function(user){
			return auth.$authWithPassword({
				email: user.email,
				password: user.password
			});
		},
		logout: function(){
			return auth.$unauth();
		},
		resolveUser: function(){
			return auth.$waitForAuth();
		},
		signedIn: function(){
			return auth.$getAuth();
		},
		user: {}
	};

	// $rootScope.$on('$firebaseSimpleLogin:login', function(e ,user){
	// 	console.log('Logged in');
	// 	angular.copy(user, Auth.user);
	// 	Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
	// 	console.log(Auth.user);
	// });
	// $rootScope.$on('$firebaseSimpleLogin:logout', function(){
	// 	console.log('Logged out');
	// 	if (Auth.user && Auth.user.profile) {
	// 		Auth.user.profile.$destroy();
	// 	};
	// 	angular.copy({}, Auth.user);
	// });

	auth.$onAuth(function(authData){
		if(authData){
			angular.copy(authData, Auth.user);
			Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
			console.log(Auth.user);
		}
		else{
			if (Auth.user && Auth.user.profile) {
				Auth.user.profile.$destroy();
			}
				angular.copy({}, Auth.user);
		}
	});
	return Auth;
}]);