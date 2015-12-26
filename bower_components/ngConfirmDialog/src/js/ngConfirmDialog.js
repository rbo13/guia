angular.module('jkuri.confirmdialog', [])

.factory('ngConfirmDialogService', ['$document', '$q', '$compile', function($document, $q, $compile) {
	var self = this,
	    $body = $document.find('body'),
	    tpl;

	var generateTpl = function (headerText, content, yesText, noText) {
		var tpl = angular.element(
		'<div class="ng-confirm-dialog-overlay"></div>' +
		'<div class="ng-confirm-dialog" ng-controller="ngConfirmDialogController as ncdctrl" ng-class="{\'load\': true}">' +
		'  <div class="ncd-header">' +
		'    <h3>' + headerText + '</h3>' +
		'    <i class="fa fa-close close" ng-click="ncdctrl.cancel()"></i>' +
		'  </div>' +
		'  <div class="ncd-content">' +
		'    <span>' + content + '</span>' +
		'  </div>' +
		'  <div class="ncd-actions">' +
		'    <button type="button" ng-click="ncdctrl.cancel()">' + noText + '</button>' +
		'    <button type="button" ng-click="ncdctrl.confirm()">' + yesText + '</button>' +
		'  </div>' +
		'</div>');

		return tpl;
	};

	var deffered;

	self.open = function (headerText, content, yesText, noText) {
		deffered = $q.defer();
		tpl = generateTpl(headerText, content, yesText, noText);
		$body.append(tpl);

		var scope = tpl.scope();
		$compile(tpl)(scope);

		$document.bind('mousewheel', function(e) {
			e.preventDefault();
		});

		return deffered.promise;
	};

	self.close = function () {
		deffered.reject();
		$document.unbind('mousewheel');
		angular.element(tpl).remove();
	};

	self.confirm = function () {
		deffered.resolve();
		self.close();
	};

	return self;
}])

.controller('ngConfirmDialogController', ['ngConfirmDialogService', function(ngConfirmDialogService) {
	var self = this;

	self.confirm = function () {
		ngConfirmDialogService.confirm();
	};

	self.cancel = function () {
		ngConfirmDialogService.close();
	};

}])

.directive('ngConfirmDialog', ['$document', 'ngConfirmDialogService', function($document, ngConfirmDialogService) {
	'use strict';

	var setScopeValues = function (scope, attrs) {
		scope.headerText = attrs.headerText || 'Are you sure?';
		scope.content = attrs.content || 'Are you sure you want to delete?';
		scope.yesText = attrs.yesText || 'Yes';
		scope.noText = attrs.noText || 'No';
	};

	var key_codes = {
		enter : 13,
		esc   : 27,
	};

	return {
		priority: 1,
		restrict: 'A',
		scope: {
			ngClick: '&'
		},
		link: function (scope, element, attrs) {
			setScopeValues(scope, attrs);

			var $body = $document.find('body');

			element.unbind('click');

			element.bind('click', function (e) {
				e.preventDefault();

				ngConfirmDialogService.open(scope.headerText, scope.content, scope.yesText, scope.noText).then(scope.ngClick);
			});

			$body.bind('keydown', function (e) {
				var which = e.which;

				if (which === key_codes.esc) {
					ngConfirmDialogService.close();
				} else if (which === key_codes.enter) {
					ngConfirmDialogService.confirm();
				}

				scope.$apply();
			});

		}
	};

}]);
