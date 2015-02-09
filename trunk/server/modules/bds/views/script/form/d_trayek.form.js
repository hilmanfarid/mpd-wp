/**
 * @class Bds.form.d_trayek
 * Form panel for table bds_d_trayek
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.d_trayek = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_trayek.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.trayek_id = new Ext.form.Hidden({fieldLabel: Bds.properties.trayek_id, name: 'trayek_id', allowBlank: true});

        this.fields.trayek_code = new Ext.form.TextField({fieldLabel: Bds.properties.trayek_code, name: 'trayek_code', allowBlank: true, width: 245});

        this.fields.trayek_name = new Ext.form.TextField({fieldLabel: Bds.properties.trayek_name, name: 'trayek_name', allowBlank: false, width: 245});

        this.fields.trayek_panjang = new Ext.form.NumberField({fieldLabel: Bds.properties.trayek_panjang, name: 'trayek_panjang', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.trayek_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.trayek_listing_no, name: 'trayek_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.trayek_description = new Ext.form.TextField({fieldLabel: Bds.properties.trayek_description, name: 'trayek_description', allowBlank: true, anchor:'95%'});

        return [
            this.fields.trayek_id,
			this.fields.trayek_code,
			this.fields.trayek_name,
			this.fields.trayek_panjang,
			this.fields.trayek_listing_no,
			this.fields.trayek_description
        ];
    },
    focusField: function(){
    	this.fields.trayek_code.focus();
    }
});
