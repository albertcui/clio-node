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
            $scope.desc = {'Author':'author_facet',
                           'Publisher':'full_publisher_display',
                           'ISBN':'isbn_display',
                           'Summary':'summary_display',
                           'Format':'format'
                          }
        	$scope.hideJumbotron = true;
        	$scope.hideResults = false;
        	$scope.totalItems = data.numFound
    		
    		console.log(data)
            
            //preprocess
            var temp = data.docs
            for(i=0; i<temp.length; i++)
            {
                call_num_data = temp[i].location_call_number_id_display[0].split('|DELIM|');
                temp[i]['call_num'] = call_num_data[0].split('>> ');
            }
            //$scope.results = data.docs
            $scope.results = temp
        })
        .error(function(data, status, headers, config){

        })          
    }

    $scope.pageChanged = $scope.search
})