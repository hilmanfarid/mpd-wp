/**
 * @class Base.module.permission
 * Module panel for table core_permission
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.module.permission = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Modul',
    editTitle: 'Edit Modul',
    winWidth:400,
    winHeight:186,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.module.permission.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Base.grid.permission({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Base.form.permission();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_permission', Base.module.permission);