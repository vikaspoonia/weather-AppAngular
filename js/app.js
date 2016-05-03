
//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//router looks at changes in hash tag 
weatherApp.config(function ($routeProvider){

    $routeProvider

    .when('/', {
    	templateUrl:'pages/home.html',
    	controller:'mainController'
    })

    .when('/forecast', {
    	templateUrl:'pages/forecast.html',
    	controller:'forecastController'
    })
     .when('/forecast/:days', {
    	templateUrl:'pages/forecast.html',
    	controller:'forecastController'
    })
});
   

//Custom Service
weatherApp.service('customService', function(){
            this.city ="Ambala";

})

//custom Directive for the Forecast

weatherApp.directive('forecastDirective', function(){

	     return {
	     	restrict:'E',
	     	templateUrl:'directive/forcast.html',
	     	replace:'true',
	     	scope :{
	     		weatherDay:"=",
	     		convertToStandard:"&",
	     		convertToDate:"&",
	     		dateFormat:"@"
	     	}
	     }
})

//Home page controller
weatherApp.controller("mainController", ['$scope','customService', function($scope, customService){
               $scope.city = customService.city;
               $scope.$watch('city', function(){
               	customService.city=$scope.city;
               })

               $scope.submit = function(){
               	
               }

}]);

//Forecast Controller
weatherApp.controller("forecastController", ['$scope','$resource','$routeParams', 'customService', function($scope, $resource, $routeParams, customService){
           $scope.city = customService.city;
            
           $scope.days =$routeParams.days || "2";
           //making connection to the resource 
           $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily',{
           	callback: "JSON_CALLBACK"},{get :{method:"JSONP"}}
           );
            //get weather from the api
           $scope.weatherResult =$scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, APPID:'8e321dfb8d7c579c114fc69411f2462f'});
           $scope.convertToFahrenheit =function(degK){
           	return Math.round((1.8 * (degK-273))+32);
           }

           $scope.convertToDate = function(date){
           	return new Date(date*1000);
           }

}]);