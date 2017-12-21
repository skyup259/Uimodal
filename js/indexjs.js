var app = angular.module('myApp', ['ui.router']);
app.config(function ($stateProvider) {
    var dashboard = {
        name: 'dashboard',
        url: '/dashboard',
        controller: 'TestCtrl',
        templateUrl: '/dashboard.html'
        
    }

    var addwidget = {
        name: 'addwidget',
        url: '/addwidget',
        controller: 'GraphCtrl',
        templateUrl: '/addwidget.html'
        
    }

    $stateProvider.state(dashboard);
    $stateProvider.state(addwidget);
});


app.factory('$storage', function ($window) {
    return {
        get: function (key) {
            var value = $window.localStorage[key];
            return value ? JSON.parse(value) : null;
        },
        set: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        }
    }
});
app.controller('TestCtrl', function ($scope, $storage) {
    $scope.$storage = $storage;

    $scope.setDisplay = function () {
        var local = []; //[{ "name": "saurabh" }, { "name": "kumar" }, { "name": "sunny" }];
        localStorage["local"] = JSON.stringify(local);

        $scope.localstring = JSON.parse(localStorage["local"]);
        var temp = $scope.localstring;
        var txt = "";
        // document.getElementById("listofname").innerHTML = temp;
        for (var i = 0; i < temp.length; i++) {
            var counter = temp[i];
            txt += "<table border='1'>"
            txt += "<tr><td>" + counter.name + "</td> <td>" + "<button > Edit </button>" + "</td> <td>" + "<button> Delete </button>" + "</td></tr > ";
            txt += "</table>"
            document.getElementById("listofname").innerHTML = txt;
            // document.getElementById("listofname").innerHTML = counter.name;
        }
    }

    $scope.allStorage = function () {
       // console.log("in");
        var values = [],
            keys = Object.keys(localStorage);
        angular.forEach(keys, function (val) {
            values.push({ 'name': val });
        })

        i = keys.length;

        $scope.check = values;
    }

    function displayGraphChart(type, data1, data2, width, height) {
        typeVar = type;
       // console.log("data1="+ data1);
       // console.log("data2="+ data2);
        var config = {};
        config.bindto = '#' + type;
        config.data = {};
        config.data.json = {};
        config.data.json.data1 = data1.split(",");
        config.data.json.data2 = data2.split(",");
        config.axis = { "y": { "label": { "text": "Number of items", "position": "outer-middle" } } };
        config.data.types = { "data1": type, "data2": type };
        config.size = { width: width * 100, height: height * 100 };
        config.override = { borderColor: ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'], hoverBorderColor: ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'] };
        config.border = { width: 4};
        $scope.chart = c3.generate(config);
    }

/**
function is for displaychart of resp name by getting data from localstroge
param: key-> passing key from the localstroage 
*/
    $scope.displayChart = function(key) {
           
            var output = document.getElementById('chart');
            var val="";
            for(var i = 0;i<$storage.get(key).length;i++){
                var innerdiv = document.createElement('div');
                innerdiv.id = $storage.get(key)[i].type;
                chart.appendChild(innerdiv);
            }

            for(var i = 0;i<$storage.get(key).length;i++){
              
                 displayGraphChart($storage.get(key)[i].type, $storage.get(key)[i].data1, $storage.get(key)[i].data2, $storage.get(key)[i].width, $storage.get(key)[i].heigth);
            }
        }
    });
app.controller('GraphCtrl', function ($scope, $rootScope, $storage) {

    $scope.chartType = ["pie", "bar", "area", "line", "spline", "step"];
    $scope.width = "5";
    $scope.height = "5";
    $scope.column = "0";
    $scope.row = "2";
    $scope.data = [
        { name: "data1", data: "231247, 37300, 19836, 06300" },
        { name: "data2", data: "654131, 65633, 52464, 223464" },
        { name: "data3", data: "654131, 65633, 52464, 223464" },
        { name: "data4", data: "6542331, 655633, 5232464, 2623464" },
        { name: "data5", data: "32451, 546545, 65523446, 4654455" }
    ];
    $scope.chart = null;
    
    var typeVar = '';  // for assigning the type of the chart
    $scope.config = {};
    // different data used for the chart
    $scope.config.data1 = "22315474, 13076300, 13691836, 10076300, 9691836";
    $scope.config.data2 = "65421331, 65464313, 52434364, 223686464, 55564649";
    $scope.config.data3 = "321, 5465, 546546, 46545, 5465465";
    $scope.userInfo = []; // adding all user infromation in this array that is type, xaxis data and yaxis data 

    // function create chart by taking type of chart and data for both axis
    // adding all new tab in parents div(id= "tabs")

    $(document).ready(function () {
        $("div#tabs").tabs();

        $("button#newtab").click(function () {

            var num_tabs = typeVar;
            // alert("num_tabs "+typeVar);
            $("div#tabs").append(
                "<div id=" + num_tabs + " </div>"
            );
            $("div#tabs ul").append(
                "<li><a href= #" + num_tabs + ">" + num_tabs + "</a></li>"
            );

        });
    });


    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.

        $scope.IsVisible = true;
    }


    $scope.Graph = function (type, data1, data2, width, height) {
        // console.log("in");
        $rootScope.firstname = "sunny";
        typeVar = type;
        var config = {};
        config.bindto = '#' + type;
        config.data = {};
        config.data.json = {};
        config.data.json.data1 = data1.split(",");
        config.data.json.data2 = data2.split(",");
        config.axis = { "y": { "label": { "text": "Number of items", "position": "outer-middle" } } };
        config.data.types = { "data1": type, "data2": type };
        config.size = { width: width * 100, height: height * 100 };
        config.override = { borderColor: ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'], hoverBorderColor: ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'] };
        config.border = { width: 4};
        $scope.chart = c3.generate(config);

        // Adding all user information 	
       // type = "type: " + type +" ";
       // data1 = "data1: " + data1 + " ";
        // data2 = "data2: " + data2 + " ";
        var obj = { type: type, data1: data1, data2: data2, width:  width, height: height};
      //  $scope.userInfo.push(type);
       // $scope.userInfo.push(data1);
        $scope.userInfo.push(obj);
      //  console.log(userInfo);
        $scope.users = null;
    }

    $scope.dashboard = function (name) {
        //userinfo = userinfo.toString();
        localStorage.setItem(name, "dsfh");
    }

    $scope.$storage = $storage;
    $scope.setAnObject = function () {
      // console.log("in function");
          var username = $scope.firstname;
        var userdetail = $scope.userInfo;
        $storage.set(username, userdetail);
    }
 
});

// button hide and show controller
app.controller('myCtrl', function ($scope) { // a controller
});



