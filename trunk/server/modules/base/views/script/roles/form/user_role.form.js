/**
 * @class Base.form.user_role
 * Form panel for table core_user_role
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.form.user_role = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.form.user_role.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.user_role_id = new Ext.form.Hidden({fieldLabel: 'User Grup ID', name: 'user_role_id', allowBlank: true});   
        this.fields.user_id = new Ext.form.Hidden({fieldLabel: Base.properties.user_id, name: 'user_id', allowBlank: true});
		this.fields.role_id = new Base.combo.role({name: 'role_id', allowBlank: false, width: 245});
		/* load record event */
		this.on('loadrecord', function(form, record, actionType){
		    this.fields.role_id.store.load();
		    
		    if (actionType == 'update'){

		    }else{

		    }
		}, this);

        return [                  
            this.fields.user_role_id,
            this.fields.user_id,
			this.fields.role_id
        ];
    },
    focusField: function(){
    	return true;
    }
});
