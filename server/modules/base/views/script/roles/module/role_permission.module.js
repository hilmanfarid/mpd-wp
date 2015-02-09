/**
 * @class Base.module.role_permission
 * Module panel for table core_role_permission
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.module.role_permission = Ext.extend(Webi.module.Panel, {
    addTitle: Base.properties.role_permission_addTitle,
    editTitle: Base.properties.role_permission_editTitle,
    winWidth:400,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.module.role_permission.superclass.initComponent.call(this);

        this.on('beforeupdate', function(mod, store, form, rec, type){
            if (Ext.isEmpty(store.baseParams.role_id)){
                Ext.Msg.alert('Perhatian', 'Invalid Role ID');
                return false;
            }

            rec.set('role_id', store.baseParams.role_id);
        }, this);
    },
    buildPanel : function(){
        this.grid = new Base.grid.role_permission({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Base.form.role_permission();
		this.initFormEvents();
		
		
		return this.form;
    },
    onWrite : function(store, action, result, res, rs){
    	this.hideActionProgress(action, true);
    	
    	if (this.win && this.win.isVisible()){
            this.win.hide();
        }
    }    
});

Ext.reg('module_role_permission', Base.module.role_permission);