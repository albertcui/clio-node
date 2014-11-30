var clioApp = angular.module('clioApp', ['ui.bootstrap'])

clioApp.controller('SearchController', function($scope, $http){
	$scope.hideJumbotron = false;
	$scope.hideResults = true;
	$scope.maxSize = 5
	$scope.currentPage = 1;

	$scope.search = function() {

		var media = []
		if($scope.book) {
			media.push('Book')
		}

		if ($scope.article) {
			media.push('Article')
		}

		if ($scope.ebook) {
			media.push('Online')
		}

		if ($scope.journal) {
			media.push('Journal')
		}

        $http({
            method:'GET',
            url: '/search.json',
            params: {search: $scope.searchText, offset: ($scope.currentPage - 1) * 10, types: media }
        })
        .success(function(data, status, headers, config){
            $scope.desc = {'Author':'author_display',
                             'Publisher':'full_publisher_display'
                            }
        	$scope.hideJumbotron = true;
        	$scope.hideResults = false;
        	$scope.totalItems = data.numFound
    		$scope.results = data.docs
    		console.log(data)
        })
        .error(function(data, status, headers, config){

        })          
    }

    $scope.pageChanged = $scope.search
})