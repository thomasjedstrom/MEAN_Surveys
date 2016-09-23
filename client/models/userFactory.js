angular.module('app')
.factory('userFactory', ['$http', '$q', function($http, $q) {

	var users = [];
	var current_user = {};

	function userFactory(){
		var self = this;

////////// httpPromise
		function httpPromise(httpRequest){
			var myPromise = $q.defer();
			httpRequest.then(
				function(res){
					if(res.data.errors){
						return myPromise.reject(res);
					}else{
						return myPromise.resolve(res);
					}
				},
				function(err){
					myPromise.reject(err);
				}
			);
			return myPromise.promise;
		}

////////// Login
		this.login = function(user){
			var newPromise = httpPromise($http.post('/users/login', user))
			newPromise.then(function(res){
				current_user = res.data.data;
				return res;
			})
			.catch(function(error){
				return error;
			})
			return newPromise;
		};

////////// Initialize Users in Factory
		this.index = function(){
			var newPromise = httpPromise($http.get('/users/index'))

			newPromise.then(function(ret){
				users = ret.data
				return ret
			})
			return newPromise
		};

////////// Logout
		this.logout = function(user){
			current_user = {};
		};		

////////// Get Current User
		this.getCurrentUser = function(){
			return current_user;
		}

	}
	return new userFactory();
}]);