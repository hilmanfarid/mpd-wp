/**
 * @class Base.form.user_permission
 * Form panel for table core_user_permission
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.form.user_permission = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.form.user_permission.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.user_id = new Ext.form.Hidden({fieldLabel: Base.properties.user_id, name: 'user_id', allowBlank: true});
		this.fields.permission_id = new Ext.form.NumberField({fieldLabel: Base.properties.permission_id, name: 'permission_id', allowBlank: false, allowDecimals: false, allowNegative: false, width: 150});

        return [
            this.fields.user_id,
			this.fields.permission_id
        ];
    },
    focusField: function(){
    	this.fields.permission_id.focus();
    }
});