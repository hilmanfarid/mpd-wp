/**
 * @class Base.module.user_role
 * Module panel for table core_user_role
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.module.user_role = Ext.extend(Webi.module.Panel, {
    addTitle: Base.properties.user_role_addTitle,
    editTitle: Base.properties.user_role_editTitle,
    winWidth:400,
    winHeight:130,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.module.user_role.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Base.grid.user_role({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Base.form.user_role();
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_user_role', Base.module.user_role);