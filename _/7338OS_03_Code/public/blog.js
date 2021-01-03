function BlogCtrl($scope, $http) {
	$scope.articles = [
		{ title: "", text: "Loading ..."}
	];
	$http({method: 'GET', url: '/api/get'})
	.success(function(data, status, headers, config) {
		$scope.articles = data;
  	})
  	.error(function(data, status, headers, config) {
    	console.error("Error getting articles.");
	});
}