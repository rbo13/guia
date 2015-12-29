(function(){
    'use strict';

    angular.module('reviewSrvc', [])
        .factory('Review', function($http){

        	var getAllGuides = function(){
        		return $http.get('/api/v1/guides');
        	}

        	var getGuide = function(_id){
        		return $http.get('/api/v1/guide/'+_id);
        	}

        	var getReviews = function(_id){
        		return $http.get('/api/v1/review/'+_id);
        	}

            return {
        		getAllGuides: getAllGuides,
        		getGuide: getGuide,
        		getReviews: getReviews
            }
        });
})();