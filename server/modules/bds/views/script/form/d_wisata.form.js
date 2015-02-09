/**
 * @class Bds.form.d_wisata
 * Form panel for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.d_wisata = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_wisata.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.wisata_id = new Ext.form.Hidden({fieldLabel: Bds.properties.wisata_id, name: 'wisata_id', allowBlank: true});

        this.fields.wisata_code = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_code, name: 'wisata_code', allowBlank: true, width: 120});

        this.fields.wisata_name = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_name, name: 'wisata_name', allowBlank: false, width: 245});

        this.fields.wisata_address_1 = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_address_1, name: 'wisata_address_1', allowBlank: true, width: 245});

        this.fields.wisata_address_2 = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_address_2, name: 'wisata_address_2', allowBlank: true, width: 245});

        this.fields.wisata_kota = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_kota, name: 'wisata_kota', allowBlank: true, width: 150});

        this.fields.wisata_kode_pos = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_kode_pos, name: 'wisata_kode_pos', allowBlank: true, width: 85});

        this.fields.wisata_phone_no = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_phone_no, name: 'wisata_phone_no', allowBlank: true, width: 165});

        this.fields.wisata_website = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_website, name: 'wisata_website', allowBlank: true, width: 245});

        this.fields.wisata_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.wisata_listing_no, name: 'wisata_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:60});

        this.fields.wisata_description = new Ext.form.TextField({fieldLabel: Bds.properties.wisata_description, name: 'wisata_description', allowBlank: true, width: 245});
        return [
            this.fields.wisata_id,
			this.fields.wisata_code,
			this.fields.wisata_name,
			this.fields.wisata_address_1,
			this.fields.wisata_address_2,
			this.fields.wisata_kota,
			this.fields.wisata_kode_pos,
			this.fields.wisata_phone_no,
			this.fields.wisata_website,
			this.fields.wisata_listing_no,
			this.fields.wisata_description
        ];
    },
    focusField: function(){
    	this.fields.wisata_code.focus();
    }
});
