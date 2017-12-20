var graphApp = angular.module('graphApp', []);

graphApp.controller('Ctrl', function ($scope) {
   
    $scope.chartType = ["pie", "bar", "area", "line", "spline", "step"];
    $scope.width = "1";
    $scope.height = "1";
    $scope.column = "0";
    $scope.row = "2";
    $scope.data = [
        { name: "data1", data: "231247, 37300, 19836, 06300" },
        { name: "data2", data: "654131, 65633, 52464, 223464" },
        { name: "data3", data: "654131, 65633, 52464, 223464" },
        { name: "data4", data: "6542331, 655633, 5232464, 2623464" },
        { name: "data5", data: "32451, 546545, 65523446, 4654455" }
    ];

});
/**
creating GraphCtrl controller
*/

graphApp.controller('GraphCtrl', function ($scope, $rootScope) {
    $scope.chart = null;
    $rootScope.firstname = "saurabh";
	var typeVar='';  // for assigning the type of the chart
    $scope.config = {};
	// different data used for the chart
	$scope.config.data1="22315474, 13076300, 13691836, 10076300, 9691836";
	$scope.config.data2="65421331, 65464313, 52434364, 223686464, 55564649";
	$scope.config.data3="321, 5465, 546546, 46545, 5465465";
    $scope.userInfo = []; // adding all user infromation in this array that is type, xaxis data and yaxis data 

// function create chart by taking type of chart and data for both axis
	// adding all new tab in parents div(id= "tabs")
	$(document).ready(function() {
	    $("div#tabs").tabs();

	    $("button#newtab").click(function() {

	        var num_tabs = typeVar;
	       // alert("num_tabs "+typeVar);
	       $("div#tabs").append(
	            "<div id=" + num_tabs +" </div>"
	        );
	        $("div#tabs ul").append(
	            "<li><a href= #" + num_tabs + ">" + num_tabs + "</a></li>"
	        );
	      
        });

       
        $("button#newtab").on("click", function (e) {
            e.preventDefault(); // prevent de default action, which is to submit
            // save your value where you want
          
            $('#modal').modal('hide');

        });
    });

    /**


    */

    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        
        $scope.IsVisible = true;
    }


    $scope.Graph = function (type, data1, data2) {
       // console.log("in");
        typeVar = type;
        var config = {};
        config.bindto = '#' + type;
        config.data = {};
        config.data.json = {};
        config.data.json.data1 = data1.split(",");
        config.data.json.data2 = data2.split(",");
        config.axis = { "y": { "label": { "text": "Number of items", "position": "outer-middle" } } };
        config.data.types = { "data1": type, "data2": type };
        $scope.chart = c3.generate(config);

        // Adding all user information 	
        $scope.userInfo.push(type);
        $scope.userInfo.push(data1);
        $scope.userInfo.push(data2);
        
        $scope.users = null;
        
    }


    $scope.dashboard = function (name) {
        //userinfo = userinfo.toString();
        localStorage.setItem(name, "dsfh");
    }
    	
});


// button hide and show controller
graphApp.controller('myCtrl', function($scope) { // a controller
});




graphApp.factory('$storage', function ($window) {
    return {
        get: function (key) {
            var value = $window.localStorage[key];
            return value ? JSON.parse(value) : null;
        },
        set: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
    }
});
graphApp.controller('TestCtrl', function ($scope, $rootScope, $storage) {
    $scope.$storage = $storage;
    $scope.setAnObject = function () {
       // console.log("in function");
      //  var username = $scope.firstname;
        var userdetail = $scope.userInfo;
       // console.log(username);
        console.log($rootScope.firstname);
        //$storage.set(username, userdetail);

    }

});


