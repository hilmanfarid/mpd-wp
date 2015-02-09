/**
 * @class Bds.form.d_pasar
 * Form panel for table bds_d_pasar
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.d_pasar = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_pasar.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.pasar_id = new Ext.form.Hidden({fieldLabel: Bds.properties.pasar_id, name: 'pasar_id', allowBlank: true});

        this.fields.pasar_code = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_code, name: 'pasar_code', allowBlank: true, width: 245});

        this.fields.pasar_name = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_name, name: 'pasar_name', allowBlank: false, width: 245});

        this.fields.pasar_address1 = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_address1, name: 'pasar_address1', allowBlank: true, anchor:'95%'});

        this.fields.pasar_address2 = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_address2, name: 'pasar_address2', allowBlank: true, anchor:'95%'});

        this.fields.pasar_kota = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_kota, name: 'pasar_kota', allowBlank: true, width: 245});

        this.fields.pasar_kodepos = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_kodepos, name: 'pasar_kodepos', allowBlank: true, width: 87});

        this.fields.pasar_phone_no = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_phone_no, name: 'pasar_phone_no', allowBlank: true, width: 245});

        this.fields.pasar_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.pasar_listing_no, name: 'pasar_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.pasar_description = new Ext.form.TextField({fieldLabel: Bds.properties.pasar_description, name: 'pasar_description', allowBlank: true, anchor:'95%'});

                
        return [
            this.fields.pasar_id,
			this.fields.pasar_code,
			this.fields.pasar_name,
			this.fields.pasar_address1,
			this.fields.pasar_address2,
			this.fields.pasar_kota,
			this.fields.pasar_kodepos,
			this.fields.pasar_phone_no,
			this.fields.pasar_listing_no,
			this.fields.pasar_description
        ];
    },
    focusField: function(){
    	this.fields.pasar_code.focus();
    }
});
