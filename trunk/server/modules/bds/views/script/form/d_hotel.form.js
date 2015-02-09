/**
 * @class Bds.form.d_hotel
 * Form panel for table bds_d_hotel
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.d_hotel = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_hotel.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.d_hotel_id = new Ext.form.Hidden({fieldLabel: 'ID', name: 'd_hotel_id', allowBlank: true});
        this.fields.code = new Ext.form.TextField({fieldLabel: 'Kode', name: 'code', allowBlank: false, width:120});
		this.fields.hotel_name = new Ext.form.TextField({fieldLabel: 'Nama', name: 'hotel_name', allowBlank: false, width:300});
		this.fields.alias_name = new Ext.form.TextField({fieldLabel: 'Alias', name: 'alias_name', allowBlank: true, width:150});
		
		this.fields.kelas_id = new Bds.combo.p_parameter({fieldLabel:'Kelas', name: 'kelas_id', allowBlank: true, width: 245});
   		/* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.kelas_id.store.baseParams.kode_type = 'KELAS HOTEL';
                this.fields.kelas_id.getStore().load({params: {param_id:record.get('kelas_id')}});
            }else{
                this.fields.kelas_id.store.baseParams.kode_type = 'KELAS HOTEL';
                delete this.fields.kelas_id.lastQuery;
                this.fields.kelas_id.doQuery('', true);                
            }
        }, this);
   		
   		
        this.fields.jml_kamar = new Ext.form.NumberField({fieldLabel: 'Jumlah Kamar', name: 'jml_kamar', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});
		this.fields.address_1 = new Ext.form.TextField({fieldLabel: 'Alamat', name: 'address_1', allowBlank: true, width:400});
		this.fields.address_2 = new Ext.form.TextField({fieldLabel: '', name: 'address_2', allowBlank: true, width:400});
		this.fields.kota = new Ext.form.TextField({fieldLabel: 'Kota', name: 'kota', allowBlank: true, width:200});
		this.fields.kode_pos = new Ext.form.TextField({fieldLabel: 'Kode Pos', name: 'kode_pos', allowBlank: true, width:60});
		this.fields.phone_no = new Ext.form.TextField({fieldLabel: 'Telepon', name: 'phone_no', allowBlank: true, width:200});
		this.fields.website = new Ext.form.TextField({fieldLabel: 'URL', name: 'website', allowBlank: true, width:400});
        this.fields.listing_no = new Ext.form.NumberField({fieldLabel: 'No Urut', name: 'listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});
        this.fields.description = new Ext.form.TextArea({fieldLabel: 'Deskripsi', name: 'description', allowBlank: true, width:400});
        return [
            this.fields.d_hotel_id,
			this.fields.code,
			this.fields.hotel_name,
			this.fields.alias_name,
			this.fields.kelas_id,
			this.fields.jml_kamar,
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
