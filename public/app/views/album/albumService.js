(function(){
    'use strict';

    angular.module('albumSrvc', [])
        .factory('Album', function($http, $q){

        	var getAlbum = function(_id){
        		return $http.get('/api/v1/album/'+_id);
        	}

            return {
            	getAlbum: getAlbum
            }
        });
})();