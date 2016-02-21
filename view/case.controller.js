/**
 * Created by R A Z A on 1/27/2015.
 */
sap.ui.controller("com.tallymarks.z_fiori_test.view.case", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf text.aaa
*/
 onInit : function() {
    console.info('[init]: case Controller ');
    // var modulePath2 = jQuery.sap.getModulePath("com.tallymarks.z_fiori_test.model", "/contracts.json");
    // var oModel2 = new sap.ui.model.json.JSONModel();
    // oModel2.loadData(modulePath2,null,false);     
 	// var DataSrc2 = { 'Contracts':  [oModel2.oData["Contracts"][0]]}; 
 	// sap.ui.getCore().byId('detail').setModel(new sap.ui.model.json.JSONModel(DataSrc2));
 },
 onAfterRendering : function() {
    console.info('[AfterRendering]: case Controller ');
 },
 onPressMasterBack : function() {    
    sap.ui.getCore().getElementById("caseDetail").invalidate();	    
    this.nav.back("caseDetail");
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