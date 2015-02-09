/**
 * @class Bds.form.p_parameter
 * Form panel for table bds_p_parameter
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_parameter = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_parameter.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.param_id = new Ext.form.Hidden({fieldLabel: Bds.properties.param_id, name: 'param_id', allowBlank: true});

        this.fields.ptype_id = new Ext.form.Hidden({fieldLabel: Bds.properties.ptype_id, name: 'ptype_id', allowBlank: true});

        this.fields.param_code = new Ext.form.TextField({fieldLabel: Bds.properties.param_code, name: 'param_code', allowBlank: false, width:150});

        this.fields.param_name = new Ext.form.TextField({fieldLabel: Bds.properties.param_name, name: 'param_name', allowBlank: false, width:150});

        this.fields.param_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.param_listing_no, name: 'param_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});

        this.fields.param_description = new Ext.form.TextField({fieldLabel: Bds.properties.param_description, name: 'param_description', allowBlank: true, anchor: '95%'});

        /*this.fields.param_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.param_creation_date, name: 'param_creation_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.param_creation_by = new Ext.form.TextField({fieldLabel: Bds.properties.param_creation_by, name: 'param_creation_by', allowBlank: true, anchor: '95%'});
        this.fields.param_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.param_updated_date, name: 'param_updated_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.param_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.param_updated_by, name: 'param_updated_by', allowBlank: true, anchor: '95%'});
        */            
        
        
        
        return [
            this.fields.param_id,
			this.fields.ptype_id,
			this.fields.param_code,
			this.fields.param_name,
			this.fields.param_listing_no,
			this.fields.param_description
			
			/*this.fields.param_creation_date,
			this.fields.param_creation_by,
			this.fields.param_updated_date,
			this.fields.param_updated_by*/
        ];
    },
    focusField: function(){
    	this.fields.ptype_id.focus();
    }
});
