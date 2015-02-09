/**
 * @class Bds.form.d_skpd
 * Form panel for table bds_d_skpd
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.form.d_skpd = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_skpd.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.d_skpd_id = new Ext.form.Hidden({fieldLabel: Bds.properties.d_skpd_id, name: 'd_skpd_id', allowBlank: true});

        this.fields.code = new Ext.form.TextField({fieldLabel: 'Kode', name: 'code', allowBlank: true, width: 245});

        this.fields.skpd_name = new Ext.form.TextField({fieldLabel: 'Nama SKPD', name: 'skpd_name', allowBlank: false, width: 245});

        this.fields.address_1 = new Ext.form.TextField({fieldLabel: 'Alamat 1', name: 'address_1', allowBlank: true, width: 245});

        this.fields.address_2 = new Ext.form.TextField({fieldLabel: 'Alamat 2', name: 'address_2', allowBlank: true, width: 245});

        this.fields.kota = new Ext.form.TextField({fieldLabel: 'Kota', name: 'kota', allowBlank: true, width: 245});

        this.fields.kode_pos = new Ext.form.TextField({fieldLabel: 'Kode Pos', name: 'kode_pos', allowBlank: true, width: 245});

        this.fields.phone_no = new Ext.form.TextField({fieldLabel: 'No Telepon', name: 'phone_no', allowBlank: true, width: 245});

        this.fields.website = new Ext.form.TextField({fieldLabel: 'Web Site', name: 'website', allowBlank: true, width: 245});

        this.fields.listing_no = new Ext.form.NumberField({fieldLabel: 'No Urut', name: 'listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.description = new Ext.form.TextField({fieldLabel: 'Deskripsi', name: 'description', allowBlank: true, width: 245});

        
        return [
            this.fields.d_skpd_id,
			this.fields.code,
			this.fields.skpd_name,
			this.fields.address_1,
			this.fields.address_2,
			this.fields.kota,
			this.fields.kode_pos,
			this.fields.phone_no,
			this.fields.website,
			this.fields.listing_no,
			this.fields.description
        ];
    },
    focusField: function(){
    	this.fields.code.focus();
    }
});
