/**
 * @class Bds.module.p_app_menu
 * Module panel for table bds_p_app_menu
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_app_menu = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_app_menu_addTitle,
    editTitle: Bds.properties.p_app_menu_editTitle,
    winWidth:400,
    winHeight:255,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_app_menu.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_app_menu({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_app_menu();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_p_app_menu', Bds.module.p_app_menu);