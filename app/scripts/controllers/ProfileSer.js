'use strict';

app.factory('Profile', ['$window','$firebase','Post','$q', 'URL',function($window,$firebase,Post.$q,URL){
	var ref = $window.Firebase(URL);

	var Profile = {
		get: function(userID){
			return $firebase(ref.child('profile').child('userID')).asObject();
		},
		getPosts: function(userID){
			var defer = $q.defer();

			$firebase(ref.child('user_post').child(userID))
			.$asArray()
			.$loaded
			.then(function(data){
				var posts = {};
				for (var i = 0; i < data.length; i++) {
					var value = data[i].$value;
					posts[i] = Post.get(value);
				}
				defer.resolve(posts);
				
			});
		return	defer.promise;
		},
	};


	return Profile;
}]);