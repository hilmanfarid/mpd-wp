/**
 * @class Bds.form.d_puskesmas
 * Form panel for table bds_d_puskesmas
 *
 * @since 06-12-2012 12:02:05
 * @author agung.hp
 */
Bds.form.d_puskesmas = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_puskesmas.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.puskesmas_id = new Ext.form.Hidden({fieldLabel: Bds.properties.puskesmas_id, name: 'puskesmas_id', allowBlank: true});

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
        
        this.fields.puskesmas_kode = new Ext.form.TextField({fieldLabel: Bds.properties.puskesmas_kode, name: 'puskesmas_kode', allowBlank: true, anchor: '95%'});

        this.fields.puskesmas_name = new Ext.form.TextField({fieldLabel: Bds.properties.puskesmas_name, name: 'puskesmas_name', allowBlank: false, anchor: '95%'});

        this.fields.puskesmas_alamat = new Ext.form.TextField({fieldLabel: Bds.properties.puskesmas_alamat, name: 'puskesmas_alamat', allowBlank: true, anchor: '95%'});

        this.fields.puskesmas_kode_pos = new Ext.form.TextField({fieldLabel: Bds.properties.puskesmas_kode_pos, name: 'puskesmas_kode_pos', allowBlank: true, anchor: '95%'});

        this.fields.puskesmas_description = new Ext.form.TextField({fieldLabel: Bds.properties.puskesmas_description, name: 'puskesmas_description', allowBlank: true, anchor: '95%'});
        
        this.fields.puskesmas_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.puskesmas_listing_no, name: 'puskesmas_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:60});

        
        return [
            this.fields.puskesmas_id,
			this.fields.puskesmas_kode,
			this.fields.puskesmas_name,
			this.fields.puskesmas_alamat,
			this.fields.kecamatan_id,
			this.fields.puskesmas_kode_pos,
			this.fields.puskesmas_description,
			this.fields.puskesmas_listing_no
		];
    },
    focusField: function(){
    	this.fields.puskesmas_kode.focus();
    }
});
