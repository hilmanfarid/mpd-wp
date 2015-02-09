/**
 * @class Bds.form.p_job_position
 * Form panel for table bds_p_job_position
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_job_position = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_job_position.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.jobpos_id = new Ext.form.Hidden({fieldLabel: Bds.properties.jobpos_id, name: 'jobpos_id', allowBlank: true});

        this.fields.jobpos_code = new Ext.form.TextField({fieldLabel: Bds.properties.jobpos_code, name: 'jobpos_code', allowBlank: true, anchor: '95%'});
        
        this.fields.jobpos_listing_no = new Ext.form.NumberField({fieldLabel: 'No Urut', name: 'jobpos_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});

        this.fields.jobpos_description = new Ext.form.TextArea({fieldLabel: Bds.properties.jobpos_description, name: 'jobpos_description', allowBlank: true, anchor: '95%'});

        this.fields.jobpos_status = new Bds.combo.TipeWilayah({fieldLabel: 'Region', name: 'jobpos_status', allowBlank: false, width:150});
        
        /*this.fields.jobpos_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.jobpos_creation_date, name: 'jobpos_creation_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.jobpos_creation_by = new Ext.form.TextField({fieldLabel: Bds.properties.jobpos_creation_by, name: 'jobpos_creation_by', allowBlank: true, anchor: '95%'});
        this.fields.jobpos_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.jobpos_updated_date, name: 'jobpos_updated_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.jobpos_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.jobpos_updated_by, name: 'jobpos_updated_by', allowBlank: true, anchor: '95%'});
        */
        
        return [
            this.fields.jobpos_id,
			this.fields.jobpos_code,
			this.fields.jobpos_listing_no,
			this.fields.jobpos_description,
			this.fields.jobpos_status
        ];
    },
    focusField: function(){
    	this.fields.jobpos_code.focus();
    }
});
