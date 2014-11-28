var clioApp = angular.module('clioApp', [])

clioApp.controller('SearchController', function($scope, $html){
	$scope.search = function() {
        $http({
            method:'GET',
            url: '/search.json',
            params: {search: $scope.searchText }
        })
        .success(function(data, status, headers, config){

        })
        .error(function(data, status, headers, config){

        })          
    }      
})