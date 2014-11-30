var clioApp = angular.module('clioApp', ['ui.bootstrap'])

clioApp.controller('SearchController', function($scope, $http){
	$scope.maxSize = 5
	$scope.currentPage = 1;

	$scope.search = function() {
		console.log("doin search")
        $http({
            method:'GET',
            url: '/search.json',
            params: {search: $scope.searchText, offset: ($scope.currentPage - 1) * 10 }
        })
        .success(function(data, status, headers, config){
        	$('.jumbotron').hide();
        	console.log(data)
        	$scope.totalItems = data.numFound
    		$scope.results = data.docs
        })
        .error(function(data, status, headers, config){

        })          
    }

    $scope.pageChanged = $scope.search
})