/**
 * @class Bds.form.d_sekolah
 * Form panel for table bds_d_sekolah
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.d_sekolah = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    levelSekolah:'',
    
    initComponent : function() {
        // super
        Bds.form.d_sekolah.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.d_sekolah_id = new Ext.form.Hidden({fieldLabel: 'ID', name: 'd_sekolah_id', allowBlank: true});
        this.fields.code = new Ext.form.TextField({fieldLabel: 'Kode', name: 'code', allowBlank: false, width:120});
		this.fields.sekolah_name = new Ext.form.TextField({fieldLabel: 'Nama', name: 'sekolah_name', allowBlank: false, width:300});
		this.fields.alias_name = new Ext.form.TextField({fieldLabel: 'Alias', name: 'alias_name', allowBlank: true, width:150});
		
		this.fields.type_id = new Bds.combo.p_school_type({fieldLabel:'Jenis ' + this.levelSekolah, name: 'type_id', allowBlank: true, width: 245});
		/* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.type_id.store.baseParams.levelKode = this.levelSekolah;
                this.fields.type_id.getStore().load({params: {param_id:record.get('type_id')}});
            }else{
                this.fields.type_id.store.baseParams.levelKode = this.levelSekolah;
                delete this.fields.type_id.lastQuery;
                this.fields.type_id.doQuery('', true);
            }
        }, this);
		
		this.fields.status_id = new Bds.combo.p_parameter({fieldLabel:'Status', name: 'status_id', allowBlank: true, width: 245});
   		/* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.status_id.store.baseParams.kode_type = 'STATUS SEKOLAH';
                this.fields.status_id.getStore().load({params: {param_id:record.get('status_id')}});
            }else{
                this.fields.status_id.store.baseParams.kode_type = 'STATUS SEKOLAH';
                delete this.fields.status_id.lastQuery;
                this.fields.status_id.doQuery('', true);                
            }
        }, this);
   		
   		
   		this.fields.tgl_berdiri = new Ext.form.DateField({fieldLabel: 'Tanggal Berdiri', name: 'tgl_berdiri', allowBlank: true, format: 'd-m-Y'});
		this.fields.address_1 = new Ext.form.TextField({fieldLabel: 'Alamat 1', name: 'address_1', allowBlank: false, width:400});
		this.fields.address_2 = new Ext.form.TextField({fieldLabel: 'Alamat 2', name: 'address_2', allowBlank: true, width:400});
		this.fields.kecamatan_id = new Bds.combo.p_wilayah({fieldLabel:'Kecamatan',name: 'kecamatan_id', allowBlank: true, width: 245});
		
		this.on('loadrecord', function(form, record, actionType){
            
            if (actionType == 'update'){
                this.fields.kecamatan_id.store.baseParams.wilayah_status = '31';
                //this.fields.kecamatan_id.getStore().load({params: {wilayah_id:record.get('kecamatan_id')}});
                this.fields.kecamatan_id.getStore().load();
            }else{
                this.fields.kecamatan_id.store.baseParams.wilayah_status = '31';
                delete this.fields.kecamatan_id.lastQuery;
                this.fields.kecamatan_id.doQuery('', true);                
            }
        
        }, this);
		
		this.fields.kota = new Ext.form.TextField({fieldLabel: 'Kota', name: 'kota', allowBlank: true, width:200});
		this.fields.kode_pos = new Ext.form.NumberField({fieldLabel: 'Kode Pos', name: 'kode_pos', allowBlank: true, width:60, allowDecimals: false, allowNegative: false, autoCreate : {tag: 'input', type: 'text', maxlength: '5', autocomplete: 'off'}});
        this.fields.listing_no = new Ext.form.NumberField({fieldLabel: 'No Urut', name: 'listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});
        this.fields.description = new Ext.form.TextArea({fieldLabel: 'Deskripsi', name: 'description', allowBlank: true, width:400});
        
        this.fields.phone_no = new Ext.form.TextField({fieldLabel: 'No.Telp', name: 'phone_no', allowBlank: true, width:150});
        this.fields.website = new Ext.form.TextField({fieldLabel: 'Website', name: 'website', allowBlank: true, width:250});
        
        return [
            this.fields.d_sekolah_id,
			this.fields.code,
			this.fields.sekolah_name,
			this.fields.alias_name,
			this.fields.type_id,
			this.fields.status_id,
			this.fields.tgl_berdiri,
			this.fields.address_1,
			this.fields.address_2,
			this.fields.kecamatan_id,
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
