angular.module('app')
.controller('showController', ['$scope', '$location', 'surveyFactory', 'userFactory', '$routeParams', '$q', function($scope, $location, surveyFactory, userFactory, $routeParams, $q) {

	$scope.current_user = userFactory.getCurrentUser();

	var getSurvey = function(){
		surveyFactory.getSurvey($routeParams)
		.then(function(res){
			$scope.survey = res
		})
	};
	getSurvey();


	$scope.vote = function(option){
		var answer = {}
		answer.id = "option" + String(option)
		surveyFactory.vote(answer, $routeParams)
		.then(function(res){
			$scope.survey = res.data.data
		})
	}

	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');
	}

}]);