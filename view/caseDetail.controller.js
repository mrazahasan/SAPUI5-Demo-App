/**
 * Created by R A Z A on 1/27/2015.
 */
sap.ui.define([
		'jquery.sap.global',
		'sap/m/Label',
		'sap/m/Link',
		'sap/m/MessageToast',
		'sap/m/Text',
		'../format/Formatter',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Label, Link, MessageToast, Text, Formatter, Fragment, Controller, JSONModel) {
	"use strict";
    var PageController = Controller.extend("com.tallymarks.z_fiori_test.view.caseDetail", {

    /**
    * Called when a controller is instantiated and its View controls (if available) are already created.
    * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
    * @memberOf text.aaa
    */
    onInit : function() {
        var self = this;
        console.info('[init]: caseDeatil Controller ');
        // set demo model on this sample
                
        // var modulePath2 = jQuery.sap.getModulePath("com.tallymarks.z_fiori_test.model", "/contracts.json");
        // var oModel2 = new sap.ui.model.json.JSONModel();
        // oModel2.loadData(modulePath2,null,false);     
        // var DataSrc2 = { 'Contracts':  [oModel2.oData["Contracts"][0]]}; 
        // sap.ui.getCore().byId('detail').setModel(new sap.ui.model.json.JSONModel(DataSrc2));
    },
    onAfterRendering : function() {
        console.info('[AfterRendering]: caseDeatil Controller ');
    },
    onPressMasterBack : function() {
        //sap.ui.getCore().getElementById("master").invalidate();
        sap.ui.getCore().getElementById("detail").invalidate();	
        //this.nav.back("master");
        this.nav.back("detail");
    },

    /**
    * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
    * (NOT before the first rendering! onInit() is used for that one!).
    * @memberOf text.aaa
    */
    onBeforeRendering: function() {
        console.info('[BeforeRendering]: caseDeatil Controller ');
        var sPath = jQuery.sap.getModulePath("TableBreadcrumb.mock", "/productHierarchy.json");
        var oModel = new JSONModel(sPath);
        this.getView().setModel(oModel);
        this.getView().setModel(new JSONModel(this.mInitialOrderState), "Order");

        if (! this.oTemplate) {
            this.oTemplate = sap.ui.xmlfragment("com.tallymarks.z_fiori_test.fragments.Row", this);
        }
        this._oTable = this.byId("idProductsTable");

        var sPath = this._getInitialPath();
        this._setAggregation(sPath);

    },
    onListItemPress: function (oEvt) {
        console.log("click");
        var context = oEvt.getSource().getBindingContext();
        this.nav.to("case",false,context);
    },

    /**
    * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
    * @memberOf text.aaa
    */
     onExit: function() {
    
     },
    // Setup crumb info, the collection root
            // and an initial product selection / order state
            sCollection: "/ProductHierarchy",
            aCrumbs: ["Cases", "Categories", "Products"],
            mInitialOrderState: {
                products: {},
                count: 0,
                hasCounts: false
            },


            // Initial path is the first crumb appended to the collection root
            _getInitialPath: function () {
                return [this.sCollection, this.aCrumbs[0]].join("/");
            },


            // Find the next crumb that follows the given crumb
            _nextCrumb: function (sCrumb) {
                for (var i = 0, ii = this.aCrumbs.length; i < ii; i++) {
                    if (this.aCrumbs[i] === sCrumb) {
                        return this.aCrumbs[i + 1];
                    }
                }
            },


            // Remove the numeric item binding from a path
            _stripItemBinding: function (sPath) {
                var aParts = sPath.split("/");
                return aParts.slice(0, aParts.length - 1).join("/");
            },


            // Build the crumb links for display in the toolbar
            _maintainCrumbLinks: function (sPath) {
                // Determine trail parts
                var aPaths = [];
                var aParts = sPath.split("/");
                while (aParts.length > 1) {
                    aPaths.unshift(aParts.join("/"));
                    aParts = aParts.slice(0, aParts.length - 2);
                }

                // Re-build crumb toolbar based on trail parts
                var oCrumbToolbar = this.byId("idCrumbToolbar");
                oCrumbToolbar.destroyContent();

                aPaths.forEach(jQuery.proxy(function (sPath, iPathIndex) {

                    var bIsFirst = iPathIndex === 0;
                    var bIsLast = iPathIndex === aPaths.length - 1;

                    // Special case for 1st crumb: fixed text
                    var sText = bIsFirst ? this.aCrumbs[0] : "{Name}";

                    // Context is one level up in path
                    var sContext = this._stripItemBinding(sPath);

                    var oCrumb = bIsLast
                        ? new Text({
                            text: sText
                        }).addStyleClass("crumbLast")
                        : new Link({
                            text: sText,
                            target: sPath,
                            press: [this.handleLinkPress, this]
                        });
                    oCrumb.bindElement(sContext);

                    oCrumbToolbar.addContent(oCrumb);
                    if (! bIsLast) {
                        var oArrow = new Label({
                            textAlign: "Center",
                            text: ">"
                        }).addStyleClass("crumbArrow");
                        oCrumbToolbar.addContent(oArrow);
                    }

                }, this));
            },


            // Navigate through the product hierarchy by rebinding the
            // table's items aggregation. Navigation is either through
            // branches (Suppliers, Categories) or leaves (Products)
            _setAggregation: function (sPath) {
                // If we're at the leaf end, turn off navigation
                var sPathEnd = sPath.split("/").reverse()[0];
                if (sPathEnd === this.aCrumbs[this.aCrumbs.length - 1]) {
                    this._oTable.setMode("MultiSelect");
                    this.byId("weightColumn").setVisible(true);
                    this.byId("dimensionsColumn").setVisible(true);
                    this.byId("ExpiryColumn").setVisible(true);
                    this.byId("SignedColumn").setVisible(true);
                }
                else {
                    this._oTable.setMode("SingleSelectMaster");
                    this.byId("dimensionsColumn").setVisible(false)
                    this.byId("weightColumn").setVisible(false);
                    this.byId("ExpiryColumn").setVisible(false);
                    this.byId("SignedColumn").setVisible(false);
                }

                // Set the new aggregation
                this._oTable.bindAggregation("items", sPath, this.oTemplate);

                this._maintainCrumbLinks(sPath);
            },


            // Add to the order based on the selection
            _updateOrder: function (oSelectionInfo) {
                var oOrderModel = this.getView().getModel("Order");
                oOrderModel.setData({products: oSelectionInfo}, true);
                var aProductsSelected = Formatter.listProductsSelected(this.getView());
                oOrderModel.setData({
                    count: aProductsSelected.length,
                    hasCounts: aProductsSelected.length > 0
                }, true);
            },


            // Navigation means a new aggregation to work our
            // way through the ProductHierarchy
            handleLinkPress: function (oEvent) {
                this._setAggregation(oEvent.getSource().getTarget());
            },
            // Take care of the navigation through the hierarchy when the
            // user selects a table row
            handleSelectionChange: function (oEvent) {
                // Determine where we are right now
                var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
                var aPath = sPath.split("/");
                var sCurrentCrumb = aPath[aPath.length - 2];

                // If we're on a leaf, remember the selections;
                // otherwise navigate
                if (sCurrentCrumb === this.aCrumbs[this.aCrumbs.length - 1]) {
                    var oSelectionInfo = {};
                    var bSelected = oEvent.getParameter("selected");
                    oEvent.getParameter("listItems").forEach(function (oItem) {
                        oSelectionInfo[oItem.getBindingContext().getPath()] = bSelected;
                    });
                    this._updateOrder(oSelectionInfo);
                } else {
                    var sNewPath = [sPath, this._nextCrumb(sCurrentCrumb)].join("/");
                    this._setAggregation(sNewPath);
                }
            }

    });

    return PageController;

});