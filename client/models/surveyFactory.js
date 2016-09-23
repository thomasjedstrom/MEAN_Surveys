angular.module('app')
.factory('surveyFactory', ['$http', '$q', 'userFactory', function($http, $q, userFactory) {

	var surveys = [];

	function surveyFactory(){
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

////////// Initialize Surveys in Factory
		this.index = function(){
			var newPromise = httpPromise($http.get('/surveys/index'))

			newPromise.then(function(ret){
				surveys = ret.data
				return ret
			})
			return newPromise
		};



////////// Create Survey
		this.create = function(survey){
			var newPromise = httpPromise($http.post('/surveys/create', survey))
			newPromise.then(
				function(ret){
					surveys =[];
					return ret;
				},
				function(err){
					return err;
				})
			return newPromise;
		} 

////////// Get a Survey
		this.getSurvey = function(idx){
			function findSurvey(survey){
				return survey._id == idx.id;
			}
			if(surveys.length == 0){
				return this.index()
				.then(function(res){
					return surveys.data.find(findSurvey)
				})
			}else{
				return $q(function(resolve, reject){
					resolve(surveys.data.find(findSurvey))
				})
			}
		};

/////////// Vote
		this.vote = function(option, survey){
			var newPromise = httpPromise($http.post('/surveys/vote/' + survey.id, option))
			newPromise.then(function(ret){
				surveys = [];
				return ret;
			})
			return newPromise;
		}

////////// Destroy
		this.delete = function(id){
			var newPromise = httpPromise($http.post('/surveys/delete/' + id))
			newPromise.then(
				function(res){
					self.index();
				},
				function(err){
					return err;
				})
			return newPromise; 
		};


	}
	return new surveyFactory();
}]);