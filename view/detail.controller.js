/**
 * Created by R A Z A on 1/27/2015.
 */
jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");
sap.ui.controller("com.tallymarks.z_fiori_test.view.detail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf text.aaa
*/
 onInit : function() {
      window.detailPageCount = true;
    console.info('[init]: detail Controller ');
    var modulePath2 = jQuery.sap.getModulePath("com.tallymarks.z_fiori_test.model", "/contracts.json");
    oModel2 = new sap.ui.model.json.JSONModel();
    oModel2.loadData(modulePath2,null,false);     
 	DataSrc2 = { 'Contracts':  [oModel2.oData["Contracts"][0]]}; 
 	sap.ui.getCore().byId('detail').setModel(new sap.ui.model.json.JSONModel(DataSrc2));
     
 },
 onBarCodeScan: function() {
        var that = this;
        var oCode = "";
        cordova.plugins.barcodeScanner.scan(
        function(result) {
            oCode = result.text;
            console.log("This is the code: " + oCode);
            //that.getView().byId("searchField").setValue(oCode);
            //that.onSearch();
        },
        function(error) {
            console.log("Scanning allowed only in Mobile devices ");
            // alert("Scanning failed: " + error);
        }
        );
    },
 onAfterRendering : function() {
    console.info('[AfterRendering]: detail Controller ');
    this.handleFilterChange();
 },
 chkCount: function(){
    if(window.detailPageCount){
      window.detailPageCount = false;
      return true;
    }
    else{
      return false;
    }
  },
  handleFilterChange: function(oEvt) {

    var aSorters = [];
    var list = this.getView().byId("idProductsTable");
    var binding = list.getBinding("items");
    var selectKey = this.getView().byId("filterSelect").getSelectedKey();
    if (selectKey === 'AN') {
      aSorters.push(new sap.ui.model.Sorter("CustomerName", false));
    } else if(selectKey === 'DN') {
      aSorters.push(new sap.ui.model.Sorter("CustomerName", true));
    }else if(selectKey === 'AS') {
      aSorters.push(new sap.ui.model.Sorter("status", false));
    }else if(selectKey === 'DS') {
      aSorters.push(new sap.ui.model.Sorter("status", true));
    }
    else  {
      aSorters.push(new sap.ui.model.Sorter("CustomerName", false));
    }

    binding.sort(aSorters);

  },
  onSearchName: function(oEvt) {
    
    // add filter for search
    var aFilters = [];
    var sQuery = oEvt.getSource().getValue();
    if (sQuery && sQuery.length > 0) {      
      aFilters.push(new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, sQuery));
      aFilters.push(new sap.ui.model.Filter("noticedate", sap.ui.model.FilterOperator.Contains, sQuery));
      aFilters.push(new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Contains, sQuery));
      aFilters.push(new sap.ui.model.Filter("signeddate", sap.ui.model.FilterOperator.Contains, sQuery));
      aFilters.push(new sap.ui.model.Filter("expirydate", sap.ui.model.FilterOperator.Contains, sQuery));
      var allFilter = new sap.ui.model.Filter(aFilters);
    }

    // update list binding
    var list = this.getView().byId("idProductsTable");
    var binding = list.getBinding("items");
    binding.filter(allFilter, "Application");

    this.handleFilterChange();
  },
 onListItemPress : function (evt) {
    var oController = sap.ui.getCore().byId("detail").getController();
    if(oController.chkCount()){
      var context = evt.getSource().getBindingContext();
      //this.nav.to("caseMaster", true, context);
      this.nav.to("caseDetail", false, context);
    }
    else{
      //sap.ui.getCore().getElementById("caseMaster").invalidate();
      sap.ui.getCore().getElementById("caseDetail").invalidate();
      var context = evt.getSource().getBindingContext();
      //this.nav.to("caseMaster", true, context);
      this.nav.to("caseDetail", false, context);
    }
 	
    
 },
 onReset: function(oEvent) {
		jQuery.sap.require("sap.m.MessageToast");
		// var params = oEvent.getParameters();
		var sMessage = "onReset trigered";
		sap.m.MessageToast.show(sMessage);
	},
	onSearch: function(oEvent) {
		jQuery.sap.require("sap.m.MessageToast");
		// var params = oEvent.getParameters();
		var sMessage = "onSearch trigered";
		sap.m.MessageToast.show(sMessage);
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf text.aaa
*/
//  onBeforeRendering: function() {
//
//  },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf text.aaa
*/
//  onAfterRendering: function() {
//
//  },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf text.aaa
*/
//  onExit: function() {
//
//  }

});