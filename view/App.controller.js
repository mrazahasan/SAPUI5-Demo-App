/**
 * Created by R A Z A on 1/27/2015.
 */
sap.ui.controller("com.tallymarks.z_fiori_test.view.App", {

  /**
   * Navigates to another page
   * @param {string} pageId The id of the next page
   * @param {sap.ui.model.Context} context The data context to be applied to the next page (optional)
   */
  to : function (pageId, ismaster, context) {

    var app = this.getView().app;

    // load page on demand
    var master = ("mainPage" === pageId);
    if (app.getPage(pageId, ismaster) === null) {
      var page = sap.ui.view({
        id : pageId,
        viewName : "com.tallymarks.z_fiori_test.view." + pageId,
        type : "XML"
      });
      page.getController().nav = this;
      app.addPage(page, ismaster);
      jQuery.sap.log.info("app controller > loaded page: " + pageId);
    }

    // show the page
    app.to(pageId);

    // set data context on the page
    if (context) {
      var page = app.getPage(pageId, ismaster);
      page.setBindingContext(context);
    }
  },

  /**
   * Navigates back to a previous page
   * @param {string} pageId The id of the next page
   */
  back : function (pageId) {
    this.getView().app.backToPage(pageId);
  }

});