/**
 * @class Bds.form.d_warga
 * Form panel for table bds_d_warga
 *
 * @since 31-10-2012 11:02:06
 * @author agung.hp
 */
Bds.form.d_warga = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_warga.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        /*this.fields = {};
        
        
        this.fields.warga_id = new Ext.form.Hidden({fieldLabel: Bds.properties.warga_id, name: 'warga_id', allowBlank: true});

        this.fields.warga_pid = new Bds.combo.d_warga({name: 'warga_pid', allowBlank: true, width: 245});
        */
        /* load record event */
        /*this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.warga_pid.getStore().load({params: {warga_pid:record.get('warga_pid')}});
            }else{
                delete this.fields.warga_pid.lastQuery;
                this.fields.warga_pid.doQuery('', true);
            }            
        }, this);

        this.fields.warga_kk_no = new Ext.form.TextField({fieldLabel: Bds.properties.warga_kk_no, name: 'warga_kk_no', allowBlank: false, anchor: '95%'});

        this.fields.warga_ktp_no = new Ext.form.TextField({fieldLabel: Bds.properties.warga_ktp_no, name: 'warga_ktp_no', allowBlank: false, anchor: '95%'});

        this.fields.warga_name = new Ext.form.TextField({fieldLabel: Bds.properties.warga_name, name: 'warga_name', allowBlank: false, anchor: '95%'});

        this.fields.jk_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.jk_id, name: 'jk_id', allowBlank: true});

        this.fields.warga_ktp_date = new Ext.form.DateField({fieldLabel: Bds.properties.warga_ktp_date, name: 'warga_ktp_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_ktpvalid_to = new Ext.form.DateField({fieldLabel: Bds.properties.warga_ktpvalid_to, name: 'warga_ktpvalid_to', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_kkvalid_to = new Ext.form.DateField({fieldLabel: Bds.properties.warga_kkvalid_to, name: 'warga_kkvalid_to', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_tgl_lahir = new Ext.form.DateField({fieldLabel: Bds.properties.warga_tgl_lahir, name: 'warga_tgl_lahir', allowBlank: false, format: 'd-m-Y'});

        this.fields.warga_tempat_lahir = new Ext.form.TextField({fieldLabel: Bds.properties.warga_tempat_lahir, name: 'warga_tempat_lahir', allowBlank: false, anchor: '95%'});

        this.fields.goldarah_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.goldarah_id, name: 'goldarah_id', allowBlank: true});

        this.fields.agama_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.agama_id, name: 'agama_id', allowBlank: true});

        this.fields.statnikah_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.statnikah_id, name: 'statnikah_id', allowBlank: true});

        this.fields.hubkel_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.hubkel_id, name: 'hubkel_id', allowBlank: true});

        this.fields.warga_address_1 = new Ext.form.TextField({fieldLabel: Bds.properties.warga_address_1, name: 'warga_address_1', allowBlank: true, anchor: '95%'});

        this.fields.warga_address_2 = new Ext.form.TextField({fieldLabel: Bds.properties.warga_address_2, name: 'warga_address_2', allowBlank: true, anchor: '95%'});

        this.fields.warga_kota = new Ext.form.TextField({fieldLabel: Bds.properties.warga_kota, name: 'warga_kota', allowBlank: true, anchor: '95%'});

        this.fields.warga_kode_pos = new Ext.form.TextField({fieldLabel: Bds.properties.warga_kode_pos, name: 'warga_kode_pos', allowBlank: true, anchor: '95%'});

        this.fields.pendidikan_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.pendidikan_id, name: 'pendidikan_id', allowBlank: true});

        this.fields.jobtype_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.jobtype_id, name: 'jobtype_id', allowBlank: true});

        this.fields.wilayah_id = new Bds.combo.p_wilayah({fieldLabel: Bds.properties.wilayah_id, name: 'wilayah_id', allowBlank: true});

        this.fields.warga_job_company = new Ext.form.TextField({fieldLabel: Bds.properties.warga_job_company, name: 'warga_job_company', allowBlank: true, anchor: '95%'});

        this.fields.warga_job_address = new Ext.form.TextField({fieldLabel: Bds.properties.warga_job_address, name: 'warga_job_address', allowBlank: true, anchor: '95%'});

        this.fields.warga_job_kota = new Ext.form.TextField({fieldLabel: Bds.properties.warga_job_kota, name: 'warga_job_kota', allowBlank: true, anchor: '95%'});

        this.fields.warga_description = new Ext.form.TextField({fieldLabel: Bds.properties.warga_description, name: 'warga_description', allowBlank: true, anchor: '95%'});

        this.fields.warga_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.warga_creation_date, name: 'warga_creation_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_created_by = new Ext.form.TextField({fieldLabel: Bds.properties.warga_created_by, name: 'warga_created_by', allowBlank: true, anchor: '95%'});

        this.fields.warga_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.warga_updated_date, name: 'warga_updated_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.warga_updated_by, name: 'warga_updated_by', allowBlank: true, anchor: '95%'});
        
        return [
            this.fields.warga_id,
			this.fields.warga_pid,
			{xtype: 'displayfield', value: 'Masukan min. 2 karakter untuk pencarian', cls: 'status-text'},
			this.fields.warga_kk_no,
			this.fields.warga_ktp_no,
			this.fields.warga_name,
			this.fields.jk_id,
			this.fields.warga_ktp_date,
			this.fields.warga_ktpvalid_to,
			this.fields.warga_kkvalid_to,
			this.fields.warga_tgl_lahir,
			this.fields.warga_tempat_lahir,
			this.fields.goldarah_id,
			this.fields.agama_id,
			this.fields.statnikah_id,
			this.fields.hubkel_id,
			this.fields.warga_address_1,
			this.fields.warga_address_2,
			this.fields.warga_kota,
			this.fields.warga_kode_pos,
			this.fields.pendidikan_id,
			this.fields.jobtype_id,
			this.fields.wilayah_id,
			this.fields.warga_job_company,
			this.fields.warga_job_address,
			this.fields.warga_job_kota,
			this.fields.warga_description,
			this.fields.warga_creation_date,
			this.fields.warga_created_by,
			this.fields.warga_updated_date,
			this.fields.warga_updated_by
        ];*/
    },
    focusField: function(){
    	//this.fields.warga_pid.focus();
    }
});
