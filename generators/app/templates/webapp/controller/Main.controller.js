sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"../model/ODataModel"
], function (BaseController,
	formatter,
	ODataModel) {
	"use strict";

	return BaseController.extend("<%= fullNamespace  %>.controller.Main", {
		oUIModel: null,
		formatter: formatter,
		oOdataModel: null,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			this.oUIModel = this.getOwnerComponent().getUIModel();
			this.oOdataModel = new ODataModel(this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser history
		 * @public
		 */
		onNavBack: function () {
			history.go(-1);
		},

		onMessagePopoverPress : function (oEvent) {
            this._getMessagePopover().openBy(oEvent.getSource());
		},
		

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		

	});
});
