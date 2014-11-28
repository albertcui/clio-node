var clioApp = angular.module('clioApp', [])

clioApp.controller('SearchController', function($scope, $http){
	$scope.search = function() {
        $http({
            method:'GET',
            url: '/search.json',
            params: {search: $scope.searchText }
        })
        .success(function(data, status, headers, config){
    		console.log(data)
        })
        .error(function(data, status, headers, config){

        })          
    }      
})