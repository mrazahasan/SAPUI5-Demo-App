/**
 * Created by R A Z A on 1/27/2015.
 */
 var self = null;
sap.ui.controller("com.tallymarks.z_fiori_test.view.master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf text.aaa
*/
 onInit: function() {
 	self = this;
  	console.info('[init]: master Controller ');
	var modulePath = jQuery.sap.getModulePath("com.tallymarks.z_fiori_test.model", "/contracts.json");
		oModel = new sap.ui.model.json.JSONModel(modulePath);
		this.getView().setModel(oModel);
 },
 onAfterRendering : function() {
    console.info('[AfterRendering]: master Controller ');
 },
    
 onListItemPress: function (evt) {
 	// console.log(evt.getSource().getTitle())
 	// self.getView('');
     
    //evt.getSource().addStyleClass("clickedItem");
    this.nav.to("detail", false);
 	k = evt.getSource().getId(); 
 	k = k.substring(k.length-1)
 	DataSrc = { 'Contracts':  [evt.getSource().getModel().oData["Contracts"][k]]};
	//sap.m.MessageToast.show("Pressed : " + evt.getSource().getTitle());
 	sap.ui.getCore().byId('detail').setModel(new sap.ui.model.json.JSONModel(DataSrc));
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