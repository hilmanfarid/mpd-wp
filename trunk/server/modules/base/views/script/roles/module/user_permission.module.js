/**
 * @class Base.module.user_permission
 * Module panel for table core_user_permission
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.module.user_permission = Ext.extend(Webi.module.Panel, {
    addTitle: Base.properties.user_permission_addTitle,
    editTitle: Base.properties.user_permission_editTitle,
    winWidth:400,
    winHeight:159,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.module.user_permission.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Base.grid.user_permission({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Base.form.user_permission();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_user_permission', Base.module.user_permission);