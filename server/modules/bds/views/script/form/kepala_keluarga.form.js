/**
 * @class Bds.form.kepala_keluarga
 * Form panel for table bds_kepala_keluarga
 *
 * @since 31-10-2012 11:02:06
 * @author agung.hp
 */
Bds.form.kepala_keluarga = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.kepala_keluarga.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.warga_id = new Ext.form.Hidden({fieldLabel: Bds.properties.warga_id, name: 'warga_id', allowBlank: true});

        this.fields.warga_kk_no = new Ext.form.TextField({fieldLabel: Bds.properties.warga_kk_no, name: 'warga_kk_no', allowBlank: false, anchor: '95%'});

        this.fields.warga_ktp_no = new Ext.form.TextField({fieldLabel: Bds.properties.warga_ktp_no, name: 'warga_ktp_no', allowBlank: false, anchor: '95%'});

        this.fields.warga_name = new Ext.form.TextField({fieldLabel: 'Nama Kepala Keluarga', name: 'warga_name', allowBlank: false, anchor: '95%'});

        this.fields.jk_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.jk_id, name: 'jk_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.jk_id.store.baseParams.kode_type = 'JENIS KELAMIN';
                this.fields.jk_id.getStore().load({params: {param_id:record.get('jk_id')}});
            }else{
                this.fields.jk_id.store.baseParams.kode_type = 'JENIS KELAMIN';
                delete this.fields.jk_id.lastQuery;
                this.fields.jk_id.doQuery('', true);                
                
            }
        }, this);
        
        
        this.fields.warga_ktp_date = new Ext.form.DateField({fieldLabel: Bds.properties.warga_ktp_date, name: 'warga_ktp_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_ktpvalid_to = new Ext.form.DateField({fieldLabel: Bds.properties.warga_ktpvalid_to, name: 'warga_ktpvalid_to', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_kkvalid_to = new Ext.form.DateField({fieldLabel: Bds.properties.warga_kkvalid_to, name: 'warga_kkvalid_to', allowBlank: true, format: 'd-m-Y'});

        this.fields.warga_tgl_lahir = new Ext.form.DateField({fieldLabel: Bds.properties.warga_tgl_lahir, name: 'warga_tgl_lahir', allowBlank: false, format: 'd-m-Y'});

        this.fields.warga_tempat_lahir = new Ext.form.TextField({fieldLabel: Bds.properties.warga_tempat_lahir, name: 'warga_tempat_lahir', allowBlank: false, anchor: '95%'});

        this.fields.goldarah_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.goldarah_id, name: 'goldarah_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.goldarah_id.store.baseParams.kode_type = 'GOLONGAN DARAH';
                this.fields.goldarah_id.getStore().load({params: {param_id:record.get('goldarah_id')}});
            }else{
                this.fields.goldarah_id.store.baseParams.kode_type = 'GOLONGAN DARAH';
                delete this.fields.goldarah_id.lastQuery;
                this.fields.goldarah_id.doQuery('', true);                
                
            }
        }, this);
        
        
        this.fields.agama_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.agama_id, name: 'agama_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.agama_id.store.baseParams.kode_type = 'AGAMA';
                this.fields.agama_id.getStore().load({params: {param_id:record.get('agama_id')}});
            }else{
                this.fields.agama_id.store.baseParams.kode_type = 'AGAMA';
                delete this.fields.agama_id.lastQuery;
                this.fields.agama_id.doQuery('', true);                
                
            }
        }, this);
        
        
        this.fields.statnikah_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.statnikah_id, name: 'statnikah_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.statnikah_id.store.baseParams.kode_type = 'STATUS PERKAWINAN';
                this.fields.statnikah_id.getStore().load({params: {param_id:record.get('statnikah_id')}});
            }else{
                              
                this.fields.statnikah_id.store.baseParams.kode_type = 'STATUS PERKAWINAN';
                this.fields.statnikah_id.store.load();
                
                delete this.fields.statnikah_id.lastQuery;
                this.fields.statnikah_id.doQuery('', true);
            }
        }, this);
        
        
        this.fields.hubkel_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.hubkel_id, name: 'hubkel_id', allowBlank: true, readOnly:true, width:245});
        this.fields.hubkel_id.store.on('load', function(store, records, options){
            for (var i=0; i < records.length; i++){
                this.fields.hubkel_id.setValue(records[0].get('param_id'));
            }
        }, this);
        
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.hubkel_id.store.baseParams.kode_type = 'HUBUNGAN KELUARGA';
                this.fields.hubkel_id.store.baseParams.extQuery = "p_parameter.param_code ILIKE '01'";
                this.fields.hubkel_id.getStore().load({params: {param_id:record.get('hubkel_id')}});
            }else{
                this.fields.hubkel_id.store.baseParams.kode_type = 'HUBUNGAN KELUARGA';
                this.fields.hubkel_id.store.baseParams.extQuery = "p_parameter.param_code ILIKE '01'";

                delete this.fields.hubkel_id.lastQuery;
                this.fields.hubkel_id.doQuery('', true);
            }
        }, this);
        
        
        this.fields.warga_address_1 = new Ext.form.TextField({fieldLabel: Bds.properties.warga_address_1, name: 'warga_address_1', allowBlank: true, anchor: '95%'});

        this.fields.warga_address_2 = new Ext.form.TextField({fieldLabel: Bds.properties.warga_address_2, name: 'warga_address_2', allowBlank: true, anchor: '95%'});

        this.fields.warga_kota = new Ext.form.TextField({fieldLabel: Bds.properties.warga_kota, name: 'warga_kota', allowBlank: true, anchor: '95%'});

        this.fields.warga_kode_pos = new Ext.form.TextField({fieldLabel: Bds.properties.warga_kode_pos, name: 'warga_kode_pos', allowBlank: true, anchor: '95%'});

        this.fields.pendidikan_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.pendidikan_id, name: 'pendidikan_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.pendidikan_id.store.baseParams.kode_type = 'PENDIDIKAN';
                this.fields.pendidikan_id.getStore().load({params: {param_id:record.get('pendidikan_id')}});
            }else{
                this.fields.pendidikan_id.store.baseParams.kode_type = 'PENDIDIKAN';
                delete this.fields.pendidikan_id.lastQuery;
                this.fields.pendidikan_id.doQuery('', true);                
                
            }
        }, this);
        
        this.fields.jobtype_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.jobtype_id, name: 'jobtype_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.jobtype_id.store.baseParams.kode_type = 'PEKERJAAN';
                this.fields.jobtype_id.getStore().load({params: {param_id:record.get('jobtype_id')}});
            }else{
                this.fields.jobtype_id.store.baseParams.kode_type = 'PEKERJAAN';
                delete this.fields.jobtype_id.lastQuery;
                this.fields.jobtype_id.doQuery('', true);                
            }
        }, this);
        
        this.fields.wilayah_id = new Bds.combo.p_wilayah({fieldLabel: 'Wilayah', name: 'wilayah_id', allowBlank: true, width:245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.wilayah_id.getStore().load({params: {wilayah_id:record.get('wilayah_id')}});
            }else{
                delete this.fields.wilayah_id.lastQuery;
                this.fields.wilayah_id.doQuery('', true);
            }            
        }, this);
        
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
            {
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'top', columnWidth:.5,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.warga_name]
                },{
                    labelAlign: 'top', columnWidth:.5, layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.hubkel_id]
                }]
            },
			{
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'top', columnWidth:.5,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.warga_kk_no]
                },{
                    labelAlign: 'top', columnWidth:.5, layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.warga_ktp_no]
                }]
            },
			{
                xtype: 'tabpanel',
                itemId: 'tabpanel-detail',
                activeTab: 0,
                defaults: {autoScroll:true},
                enableTabScroll:true,
                height: 250,
                items:[ 
                        /*alamat*/
                        {
                            title: 'Alamat',
                            itemId: 'alamat',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    
                                    this.fields.wilayah_id,
			                        this.fields.warga_address_1,
			                        this.fields.warga_address_2,
			                        this.fields.warga_kota,
			                        this.fields.warga_kode_pos               			
                                ]
                            }
                        },
                        
                        /*Data Pribadi*/
                        {
                            title: 'Data Pribadi',
                            itemId: 'data-pribadi',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    this.fields.jk_id,
                                    this.fields.warga_tgl_lahir,
                        			this.fields.warga_tempat_lahir,
                        			this.fields.goldarah_id,
                        			this.fields.agama_id,
                        			this.fields.statnikah_id,			
                        			this.fields.pendidikan_id           			
                                ]
                            }
                        },
                        /*Pekerjaan*/
                        {
                            title: 'Pekerjaan',
                            itemId: 'pekerjaan',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    this.fields.jobtype_id,
                        			this.fields.warga_job_company,
                        			this.fields.warga_job_address,
                        			this.fields.warga_job_kota        			
                                ]
                            }
                        },
                        
                        /*Lain-lain*/
                        {
                            title: 'Lain-lain',
                            itemId: 'others',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    this.fields.warga_ktp_date,
                        			this.fields.warga_ktpvalid_to,
                        			this.fields.warga_kkvalid_to,			
                        			this.fields.warga_description   			
                                ]
                            }
                        }
                ]
            }
			
        ];
    },
    focusField: function(){
    	this.fields.warga_name.focus();
    }
});
