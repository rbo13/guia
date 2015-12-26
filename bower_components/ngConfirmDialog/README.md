# ngConfirmDialog
AngularJS Native Confirm Dialog Directive

#### Description 

Directive prevents original ng-click directive with styled confirm dialog and fires the original event when (if) confirmed.

#### Example 

Check out [the live demo](http://demo.jankuri.com/ngConfirmDialog/)

Install
-------

#### With bower:

    $ bower install ngConfirmDialog
    
#### Example Configuration
```html
<!DOCTYPE html>
<html ng-app="app">
<head>
	<title>AngularJS DatePicker</title>
	<link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="bower_components/ngConfirmDialog/src/css/ngConfirmDialog.css">
</head>
<body ng-controller="Ctrl as ctrl">

<div>
	<button ng-click="ctrl.shout()" 
			ng-confirm-dialog>
		Action
	</button>
</div>

<div>
	<a href="javascript:;"
	   ng-click="ctrl.foo()" 
	   ng-confirm-dialog 
	   header-text="Ali ste prepričani?" 
	   content="Ali ste prepričani, da to res želite? :-)" 
	   yes-text="Da" 
	   no-text="Ne">
		Akcija
	</a>
</div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.6/angular.min.js"></script>
<script type="text/javascript" src="https://code.angularjs.org/1.4.6/angular-animate.min.js"></script>
<script type="text/javascript" src="bower_components/ngConfirmDialog/src/js/ngConfirmDialog.js"></script>
<script type="text/javascript">
var app = angular.module('app', ['ngAnimate', 'jkuri.confirmdialog']);

app.controller('Ctrl', [function() {
	var self = this;

	self.shout = function () {
		console.log('DA YES!');
	};

	self.foo = function () {
		alert('Dobro!');
	};
}]);
</script>
</body>
</html>
``` 

For more information please see [http://demo.jankuri.com/ngConfirmDialog/](http://demo.jankuri.com/ngConfirmDialog/)
