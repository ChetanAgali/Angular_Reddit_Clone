'use strict';

// app.factory('Post', ['$resource', function($resource){
// 	return $resource("https://fiery-heat-8163.firebaseio.com/Posts/:id.json");
// }]);

app.factory('Post', ['$firebase', 'URL',function($firebase,URL){
	var ref = new Firebase(URL);
	var posts = $firebase(ref.child('Posts')).$asArray();

	var post = {
		all: posts,
		create: function(data){
			return posts.$add(data).then(function(postRef){
				$firebase(ref.child('user_posts').child(data.creatorUID))
				.$push(postRef.name());
				return postRef;
			});
		},
		get: function(postID){
			return $firebase(ref.child('Posts').child(postID)).$asObject();
		},
		delete: function(postdata){	
			return posts.$remove(postdata);
		},
		comments: function(postId){
			return $firebase(ref.child('comments').child(postId)).$asArray();
		}
	};

	return post
}]);
