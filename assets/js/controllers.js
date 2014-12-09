var clioApp = angular.module('clioApp', ['ui.bootstrap'])

clioApp.controller('SearchController', function($scope, $http, $location){
	$scope.hideJumbotron = false;
	$scope.hideResults = true;
	$scope.maxSize = 5
	$scope.currentPage = 1;

    $scope.advancedSearch = false;
    $scope.advancedSearchFields = ['Title','Author','Date','ISBN','Subject','Keywords']
    
	$scope.search = function() {

		var media = []
		if($scope.book) {
			media.push('Book')
		}

		if ($scope.video) {
			media.push('Video')
		}

		if ($scope.eresource) {
			media.push('Online')
		}

		if ($scope.journal) {
			media.push('Journal/Periodical')
		}

        if ($scope.other) {
            media.push('Other')
        }

        $location.path('/search').search({q: $scope.searchText})

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