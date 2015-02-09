/**
 * @class Base.form.role
 * Form panel for table core_role
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.form.role = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.form.role.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.role_id = new Ext.form.Hidden({fieldLabel: Base.properties.role_id, name: 'role_id', allowBlank: true});
		this.fields.role_name = new Ext.form.TextField({fieldLabel: Base.properties.role_name, name: 'role_name', allowBlank: false, anchor: '95%', maxLength: 255});
		this.fields.role_status = new Base.combo.ActiveStatus({fieldLabel: Base.properties.role_status, name: 'role_status', allowBlank: false});
        
        return [
            this.fields.role_id,
			this.fields.role_name,
			this.fields.role_status
        ];
    },
    focusField: function(){
    	this.fields.role_name.focus();
    }
});
