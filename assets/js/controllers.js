var clioApp = angular.module('clioApp', [])

clioApp.controller('SearchController', function($scope, $http){
	$scope.search = function() {
        $http({
            method:'GET',
            url: '/search.json',
            params: {search: $scope.searchText }
        })
        .success(function(data, status, headers, config){
        	$('.jumbotron').hide()
            console.log(data)
    		$scope.results = data
            $scope.desc = {'Author':'author_display',
                             'Publisher':'full_publisher_display'
                            }
        })
        .error(function(data, status, headers, config){

        })          
    }      
})