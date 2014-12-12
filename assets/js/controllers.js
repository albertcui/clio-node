var clioApp = angular.module('clioApp', ['ui.bootstrap', 'ngDialog'])

clioApp.controller('SearchController', function($scope, $http, $location, ngDialog){
	$scope.hideJumbotron = false;
	$scope.hideResults = true;
	$scope.maxSize = 5
	$scope.currentPage = 1;

    $scope.advancedSearch = false;
    $scope.advancedSearchFields = ['Title','Author','Date','ISBN','Subject','Keywords']
    
    $scope.email = function(name, call){
        ngDialog.open({ 
            template: 'email_form',
            className: 'ngdialog-theme-default',
            controller: ['$scope', function($scope) {
                $scope.submit = function() {

                    var p = {email: $scope.email, name: name, location: call[0]}

                    if (call.length > 1) {
                        p.call = call[1]
                    } else {
                        p.call = ""
                    }

                    $http({
                        method:'POST',
                        url: '/email',
                        params: p
                    })
                    .success(function(data){
                        console.log("EMAILED!")
                        $scope.closeThisDialog()
                    })
                    .error(function(data) {
                        $scope.closeThisDialog()  
                    })
                    
                }
            }]
        })
    }
    
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
            $scope.desc = {
                'true':
                    {'Title (Vernacular)':'title_vern_display',
                    'Author':'author_facet',
                    'Publisher':'full_publisher_display',
                    'ISBN':'isbn_display',
                    'Format':'format',
                    'Language':'language_facet',
                    'Repository':'repository_facet',
                    'Subject':'subject_topic_facet',
                    'Subject (Region)':'subject_geo_facet',
                    'Subject (Era)':'subject_era_facet',
                    'Subject (Genre)':'subject_form_facet',
                    'Title Series':'title_series_display',
                    'Summary':'summary_display'
                    },
                'false':
                    {'Title (Vernacular)':'title_vern_display',
                    'Author':'author_facet',
                    'Publisher':'full_publisher_display',
                    'ISBN':'isbn_display',
                    'Format':'format'
                    }
            };
            $scope.fullDesc = false;
        	$scope.hideJumbotron = true;
        	$scope.hideResults = false;
        	$scope.totalItems = data.numFound;
    		
    		console.log(data);
            
            $http.get('/assets/js/locations.json').success(function(response){
                $scope.LOCATIONS = response;
            }); 
            
            //preprocess
            var temp = data.docs;
            for(i=0; i<temp.length; i++)
            {
                call_num_data = temp[i].location_call_number_id_display[0].split('|DELIM|');
                temp[i]['call_num'] = call_num_data[0].split('>> ');
            }
            //$scope.results = data.docs
            $scope.results = temp;
        })
        .error(function(data, status, headers, config){

        })          
    }

    $scope.pageChanged = $scope.search
})