/**
 * Created by R A Z A on 5/23/2015.
 */
jQuery.sap.declare("com.tallymarks.z_fiori_test.Component");
//jQuery.sap.require("com.tallymarks.z_fiori_test.util.dataManagerLib");

sap.ui.core.UIComponent.extend("com.tallymarks.z_fiori_test.Component", {
    
    metadata : {
			includes : [ "style/style.css", "JS/script.js" ],
		},
    createContent : function() {
        // create root view
        var oView = sap.ui.view({
            id : "app",
            viewName : "com.tallymarks.z_fiori_test.view.App",
            type : "JS",
            viewData : { component : this }
        });
//        var url = (typeof window["useODataPrefix"] !== "undefined" ? jQuery.sap.getModulePath("com.tallymarks.z_fiori_test") : "") + "/sap/opu/odata/sap/ZTIMESHEET_SRV/";
//        var oModel1 = new sap.ui.model.odata.ODataModel(url, false);

//        com.tallymarks.z_fiori_test.util.dataManagerLib.init(oModel1);
//        oView.setModel(oModel1);
        return oView;
    }
});