var app = angular.module('eFarmTestApp', []); /*['ngRoute']).
			config(function($routeProvider, $sceDelegateProvider) {
				$sceDelegateProvider.resourceUrlWhitelist([
				'self',
				'http://dev.efarmer.mobi:8080/**'
				]);
			});*/

app.controller('TasksCtrl', function($scope, $http) {
	var base_url = 'http://localhost:8080/RESTService/RESTService/preview/document?uri=';
	$scope.taskUrls = [    
		'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/d3ababca-4ad0-43c2-aef4-31f723d22b0b',
	    'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/d74a42f4-dea7-4b08-a6ac-814738d6d9fc',
	    'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/f0903ea1-a4ef-4709-a910-44d5206a864e',
	    'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/e653f518-af71-4e8a-84d0-c26208543e25',
	    'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/8fe5d598-7ebc-47a7-ac8e-3eee86397c3d',
	    'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/7f10fce2-18cb-4e5d-a9b4-ff99a334bbd4',
	    'http://localhost:8080/RESTService/RESTService/preview/document?uri=content://TRACK/810a37ea-d390-4539-b261-1106c2cc7579'];

	$scope.tasks = [];
	$scope.tasks.diselectAll = function() {
		$scope.tasks.forEach((el) => {
			el.selected = false;
		});
	}
	$scope.tasks.curTask = {
		date: '',
		attrs: [
			{img: 'resources/images/task-field.png',     key: 'Field:',     value: ''},
			{img: 'resources/images/task-operation.png', key: 'Operation:', value: ''},
			{img: 'resources/images/task-vehicle.png',   key: 'Vehicle:',   value: ''},
			{img: 'resources/images/task-materials.png', key: 'Materials:', value: ''},
			{img: 'resources/images/task-from.png',      key: 'From:',      value: ''},
		]
	};


	var i = 0;
	getTask();

	function getTask() {
		$http.get($scope.taskUrls[i])
		  .then(function successCallback(res) {
			var task = {
				date: res.data.startTime.slice(0, 10).split('-').reverse().join('.'),
				attrs: [
					{img: 'resources/images/task-field.png',     key: 'Field:',     value: res.data.operation.field.name},
					{img: 'resources/images/task-operation.png', key: 'Operation:', value: res.data.operation.name},
					{img: 'resources/images/task-vehicle.png',   key: 'Vehicle:',   value: res.data.operation.vehicle.vehicleType.name},
					{img: 'resources/images/task-materials.png', key: 'Materials:', value: 'Acamite, Evergreen'},
					{img: 'resources/images/task-from.png',      key: 'From:',      value: res.data.org.name},
				],
			}
			$scope.tasks.push(task);
			i++;
			// console.log(i);
			if (i < $scope.taskUrls.length) {
				getTask();
			}
		  }); 
	}
});