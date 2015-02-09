/**
 * @class Bds.form.d_rumahsakit
 * Form panel for table bds_d_rumahsakit
 *
 * @since 05-12-2012 12:48:54
 * @author agung.hp
 */
Bds.form.d_rumahsakit = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_rumahsakit.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.rs_id = new Ext.form.Hidden({fieldLabel: Bds.properties.rs_id, name: 'rs_id', allowBlank: true});

        this.fields.rs_kode = new Ext.form.TextField({fieldLabel: 'Kode', name: 'rs_kode', allowBlank: true, anchor: '75%'});

        this.fields.rs_name = new Ext.form.TextField({fieldLabel: Bds.properties.rs_name, name: 'rs_name', allowBlank: false, anchor: '95%'});
        
        this.fields.jenis_id = new Bds.combo.p_parameter({fieldLabel:'Jenis Rumah Sakit',name: 'jenis_id', allowBlank: true, width: 245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            
            if (actionType == 'update'){
                this.fields.jenis_id.store.baseParams.kode_type = 'JENIS RUMAH SAKIT';
                this.fields.jenis_id.getStore().load({params: {param_id:record.get('jenis_id')}});
            }else{
                this.fields.jenis_id.store.baseParams.kode_type = 'JENIS RUMAH SAKIT';
                delete this.fields.jenis_id.lastQuery;
                this.fields.jenis_id.doQuery('', true);                
            }
        
        }, this);
        
        this.fields.kecamatan_id = new Bds.combo.p_wilayah({fieldLabel:'Kecamatan',name: 'kecamatan_id', allowBlank: true, width: 245});
        /* load record event */
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
        
        this.fields.rs_alamat1 = new Ext.form.TextField({fieldLabel: Bds.properties.rs_alamat1, name: 'rs_alamat1', allowBlank: true, anchor: '95%'});

        this.fields.rs_alamat2 = new Ext.form.TextField({fieldLabel: Bds.properties.rs_alamat2, name: 'rs_alamat2', allowBlank: true, anchor: '95%'});

        this.fields.rs_kode_pos = new Ext.form.TextField({fieldLabel: Bds.properties.rs_kode_pos, name: 'rs_kode_pos', allowBlank: true, width:100});

        this.fields.rs_phone = new Ext.form.TextField({fieldLabel: Bds.properties.rs_phone, name: 'rs_phone', allowBlank: true, width:200});

        this.fields.rs_website = new Ext.form.TextField({fieldLabel: Bds.properties.rs_website, name: 'rs_website', allowBlank: true, anchor: '95%'});

        this.fields.rs_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.rs_listing_no, name: 'rs_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:60});

        this.fields.rs_description = new Ext.form.TextField({fieldLabel: Bds.properties.rs_description, name: 'rs_description', allowBlank: true, anchor: '95%'});

        
        return [
            this.fields.rs_id,
			this.fields.rs_kode,
			this.fields.rs_name,
			this.fields.jenis_id,
			this.fields.rs_alamat1,
			this.fields.rs_alamat2,
			this.fields.kecamatan_id,
			this.fields.rs_kode_pos,
			this.fields.rs_phone,
			this.fields.rs_website,
			this.fields.rs_listing_no,
			this.fields.rs_description
        ];
    },
    focusField: function(){
    	this.fields.rs_kode.focus();
    }
});
