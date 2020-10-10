/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"<%= name_space_slash %>/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});