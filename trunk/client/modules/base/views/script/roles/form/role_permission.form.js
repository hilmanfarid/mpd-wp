/**
 * @class Base.form.role_permission
 * Form panel for table core_role_permission
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.form.role_permission = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.form.role_permission.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
		this.fields.permission_id = new Ext.form.Hidden({fieldLabel: Base.properties.permission_id, name: 'permission_id', allowBlank: false});
        this.fields.permission_level = new Base.combo.PermissionLevel({fieldLabel: Base.properties.permission_level, name: 'permission_level', allowBlank: true});

        return [
			this.fields.permission_id,
			{xtype: 'displayfield', fieldLabel: Base.properties.permission_module, name: 'permission_module'},
			{xtype: 'displayfield', fieldLabel: Base.properties.permission_name, name: 'permission_name'},
			{xtype: 'displayfield', fieldLabel: Base.properties.permission_desc, name: 'permission_desc'},
			this.fields.permission_level
        ];
    },
    focusField: function(){
    	return true;
    },
    /**
     * buildUI
     * @private
     */
    buildUI: function(){
        this.btnUpdate = new Ext.Button({
        	itemId: 'btnUpdate',
            text: 'Set Hak Akses',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this
        });
        
        this.btnCancel = new Ext.Button({
        	itemId: 'btnCancel',
            text: 'Tutup',
            iconCls: 'icon-closewin',
            handler: this.onCancel,
            scope: this
        });
        
        return [this.btnUpdate, this.btnCancel];
    },
    setButton: function(){
        // no need to set button for role_permission
	} 
});
