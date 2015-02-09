/**
 * @class Bds.form.p_global_param
 * Form panel for table bds_p_global_param
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_global_param = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_global_param.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.gparam_id = new Ext.form.Hidden({fieldLabel: Bds.properties.gparam_id, name: 'gparam_id', allowBlank: true});

        this.fields.gtype_id = new Ext.form.Hidden({fieldLabel: Bds.properties.gtype_id, name: 'gtype_id', allowBlank: true});

        this.fields.gparam_code = new Ext.form.TextField({fieldLabel: Bds.properties.gparam_code, name: 'gparam_code', allowBlank: false, anchor: '95%'});

        this.fields.gparam_value_1 = new Ext.form.TextField({fieldLabel: Bds.properties.gparam_value_1, name: 'gparam_value_1', allowBlank: true, anchor: '95%'});

        this.fields.gparam_type_1 = new Bds.combo.JenisRange({fieldLabel: Bds.properties.gparam_type_1, name: 'gparam_type_1', allowBlank: true, width:150});

        this.fields.gparam_is_range = new Bds.combo.isRange({fieldLabel: Bds.properties.gparam_is_range, name: 'gparam_is_range', allowBlank: true});

        this.fields.gparam_value_2 = new Ext.form.TextField({fieldLabel: Bds.properties.gparam_value_2, name: 'gparam_value_2', allowBlank: true, anchor: '95%'});

        this.fields.gparam_description = new Ext.form.TextArea({fieldLabel: Bds.properties.gparam_description, name: 'gparam_description', allowBlank: true, anchor: '95%'});

        /*this.fields.gparam_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.gparam_creation_date, name: 'gparam_creation_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.gparam_creation_by = new Ext.form.TextField({fieldLabel: Bds.properties.gparam_creation_by, name: 'gparam_creation_by', allowBlank: true, anchor: '95%'});
        this.fields.gparam_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.gparam_updated_date, name: 'gparam_updated_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.gparam_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.gparam_updated_by, name: 'gparam_updated_by', allowBlank: true, anchor: '95%'});
        */
                
        return [
            this.fields.gparam_id,
			this.fields.gtype_id,
			this.fields.gparam_code,
			this.fields.gparam_value_1,
			this.fields.gparam_type_1,
			this.fields.gparam_is_range,
			this.fields.gparam_value_2,
			this.fields.gparam_description
			
			/*,
			this.fields.gparam_creation_date,
			this.fields.gparam_creation_by,
			this.fields.gparam_updated_date,
			this.fields.gparam_updated_by*/
        ];
    },
    focusField: function(){
    	this.fields.gtype_id.focus();
    }
});
