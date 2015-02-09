/**
 * @class Base.form.permission
 * Form panel for table core_permission
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.form.permission = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.form.permission.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.permission_id = new Ext.form.Hidden({fieldLabel: Base.properties.permission_id, name: 'permission_id', allowBlank: true});
		this.fields.permission_name = new Ext.form.TextField({fieldLabel: 'Nama Modul', name: 'permission_name', allowBlank: false, anchor: '95%', maxLength: 255});
		this.fields.permission_desc = new Ext.form.TextField({fieldLabel: Base.properties.permission_desc, name: 'permission_desc', allowBlank: true, anchor: '95%', maxLength: 255});
		this.fields.permission_module = new Ext.form.Hidden({fieldLabel: 'Nama Modul', name: 'permission_module', allowBlank: true, anchor: '95%'});
        
        return [
            this.fields.permission_id,
			this.fields.permission_name,
			this.fields.permission_desc,
			this.fields.permission_module
        ];
    },
    focusField: function(){
    	this.fields.permission_name.focus();
    }
});
