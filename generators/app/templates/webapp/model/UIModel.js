sap.ui.define(["sap/ui/base/Object", "sap/ui/model/json/JSONModel"], function (BaseObject, JSONModel) {

  return BaseObject.extend("<%= fullNamespace  %>.model.UIModel", {
    oComponentCtrl: null,
    oModel: null,

    constructor: function (oComponentCtrl) {
      this.oComponentCtrl = oComponentCtrl;
    },

    generate: function () {
      this.oModel = new JSONModel({
        mySample: '',
        myTable: []
      });

      return this.oModel;
    },

    getMySample: function () {
      return this.oModel.getProperty("/mySample");
    },

    setMySample: function (sNewValue) {
      this.oModel.setProperty("/mySample", sNewValue);
    }

  });
});

