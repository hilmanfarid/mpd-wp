/**
 * @class Bds.form.d_jalan
 * Form panel for table bds_d_jalan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.d_jalan = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_jalan.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.d_jalan_id = new Ext.form.Hidden({fieldLabel: 'ID', name: 'd_jalan_id', allowBlank: true});
        this.fields.code = new Ext.form.TextField({fieldLabel: 'Kode', name: 'code', allowBlank: false, width:120});
		this.fields.jalan_name = new Ext.form.TextField({fieldLabel: 'Nama', name: 'jalan_name', allowBlank: false, width:300});
		
		this.fields.klas_admin_id = new Bds.combo.p_parameter({fieldLabel:'Kelas (Administrasi)', name: 'klas_admin_id', allowBlank: true, width: 245});
   		/* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.klas_admin_id.store.baseParams.kode_type = 'KELAS JALAN - ADMINISTRASI';
                this.fields.klas_admin_id.getStore().load({params: {param_id:record.get('kelas_id')}});
            }else{
                this.fields.klas_admin_id.store.baseParams.kode_type = 'KELAS JALAN - ADMINISTRASI';
                delete this.fields.klas_admin_id.lastQuery;
                this.fields.klas_admin_id.doQuery('', true);                
            }
        }, this);
   		
		this.fields.klas_fungsi_id = new Bds.combo.p_parameter({fieldLabel:'Kelas (Fungsi)', name: 'klas_fungsi_id', allowBlank: true, width: 245});
   		/* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.klas_fungsi_id.store.baseParams.kode_type = 'KELAS JALAN - FUNGSI';
                this.fields.klas_fungsi_id.getStore().load({params: {param_id:record.get('kelas_id')}});
            }else{
                this.fields.klas_fungsi_id.store.baseParams.kode_type = 'KELAS JALAN - FUNGSI';
                delete this.fields.klas_fungsi_id.lastQuery;
                this.fields.klas_fungsi_id.doQuery('', true);                
            }
        }, this);

		this.fields.klas_muat_id = new Bds.combo.p_parameter({fieldLabel:'Kelas (Muatan)', name: 'klas_muat_id', allowBlank: true, width: 245});
   		/* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.klas_muat_id.store.baseParams.kode_type = 'KELAS JALAN - MUATAN';
                this.fields.klas_muat_id.getStore().load({params: {param_id:record.get('kelas_id')}});
            }else{
                this.fields.klas_muat_id.store.baseParams.kode_type = 'KELAS JALAN - MUATAN';
                delete this.fields.klas_muat_id.lastQuery;
                this.fields.klas_muat_id.doQuery('', true);                
            }
        }, this);

   		
        this.fields.panjang = new Ext.form.NumberField({fieldLabel: 'Panjang (km)', name: 'panjang', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});
        this.fields.listing_no = new Ext.form.NumberField({fieldLabel: 'No Urut', name: 'listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});
        this.fields.description = new Ext.form.TextArea({fieldLabel: 'Deskripsi', name: 'description', allowBlank: true, width:400});
        return [
            this.fields.d_jalan_id,
			this.fields.code,
			this.fields.jalan_name,
			this.fields.klas_admin_id,
			this.fields.klas_fungsi_id,
			this.fields.klas_muat_id,
			this.fields.panjang,
			this.fields.listing_no,
			this.fields.description
        ];
    },
    focusField: function(){
    	this.fields.code.focus();
    }
});
