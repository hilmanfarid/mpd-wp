/**
 * @class Bds.form.p_wilayah_person
 * Form panel for table bds_p_wilayah_person
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_wilayah_person = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_wilayah_person.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.wp_id = new Ext.form.Hidden({fieldLabel: Bds.properties.wp_id, name: 'wp_id', allowBlank: true});

        this.fields.param_id = new Bds.combo.p_parameter({name: 'param_id', allowBlank: true, width: 245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.param_id.getStore().load({params: {param_id:record.get('param_id')}});
            }else{
                delete this.fields.param_id.lastQuery;
                this.fields.param_id.doQuery('', true);
            }            
        }, this);

        this.fields.jobpos_id = new Bds.combo.p_job_position({fieldLabel:'Jabatan', name: 'jobpos_id', allowBlank: true, width: 245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                
                this.fields.jobpos_id.store.baseParams.jobpos_status = record.get('wilayah_status'); 
                this.fields.jobpos_id.store.load();
                //this.fields.jobpos_id.getStore().load({params: {jobpos_id:record.get('jobpos_id')}});
            }else{
                
                this.fields.jobpos_id.store.baseParams.jobpos_status = record.get('wilayah_status'); 
                this.fields.jobpos_id.store.load();

            }
        }, this);

        this.fields.wilayah_id = new Bds.combo.p_wilayah({fieldLabel:'Region', name: 'wilayah_id', allowBlank: true, anchor:'98%', readOnly:true});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.wilayah_id.getStore().load({params: {wilayah_id:record.get('wilayah_id')}});
            }else{
                
                delete this.fields.wilayah_id.lastQuery;
                this.fields.wilayah_id.doQuery('', true);
            }            
        }, this);

        this.fields.rsp_name = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_name, name: 'rsp_name', allowBlank: false, anchor: '95%'});

        this.fields.rsp_start_position_year = new Ext.form.NumberField({fieldLabel: Bds.properties.rsp_start_position_year, name: 'rsp_start_position_year', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.rsp_end_position_year = new Ext.form.NumberField({fieldLabel: Bds.properties.rsp_end_position_year, name: 'rsp_end_position_year', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.rsp_valid_from = new Ext.form.DateField({fieldLabel: Bds.properties.rsp_valid_from, name: 'rsp_valid_from', allowBlank: true, format: 'd-m-Y'});

        this.fields.rsp_valid_to = new Ext.form.DateField({fieldLabel: Bds.properties.rsp_valid_to, name: 'rsp_valid_to', allowBlank: true, format: 'd-m-Y'});

        this.fields.rsp_date_of_birth = new Ext.form.DateField({fieldLabel: Bds.properties.rsp_date_of_birth, name: 'rsp_date_of_birth', allowBlank: true, format: 'd-m-Y'});

        this.fields.rsp_place_of_birth = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_place_of_birth, name: 'rsp_place_of_birth', allowBlank: true, width:200});

        this.fields.rsp_age = new Ext.form.NumberField({fieldLabel: Bds.properties.rsp_age, name: 'rsp_age', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.rsp_address_1 = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_address_1, name: 'rsp_address_1', allowBlank: true, anchor: '95%'});

        this.fields.rsp_address_2 = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_address_2, name: 'rsp_address_2', allowBlank: true, anchor: '95%'});

        this.fields.rsp_address_3 = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_address_3, name: 'rsp_address_3', allowBlank: true, anchor: '95%'});

        this.fields.rsp_id_no = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_id_no, name: 'rsp_id_no', allowBlank: true, anchor: '95%'});

        this.fields.rsp_phone_no = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_phone_no, name: 'rsp_phone_no', allowBlank: true, anchor: '95%'});

        this.fields.rsp_mobile_no = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_mobile_no, name: 'rsp_mobile_no', allowBlank: true, anchor: '95%'});

        this.fields.rsp_description = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_description, name: 'rsp_description', allowBlank: true, anchor: '95%'});

        /*this.fields.rsp_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.rsp_creation_date, name: 'rsp_creation_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.rsp_created_by = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_created_by, name: 'rsp_created_by', allowBlank: true, anchor: '95%'});
        this.fields.rsp_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.rsp_updated_date, name: 'rsp_updated_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.rsp_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.rsp_updated_by, name: 'rsp_updated_by', allowBlank: true, anchor: '95%'});
        */
        
        /* Data Pribadi */
        
        this.fields.agama_id = new Bds.combo.p_parameter({fieldLabel:'Agama', name: 'agama_id', allowBlank: true, width: 245});
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
        
        this.fields.jk_id = new Bds.combo.p_parameter({fieldLabel:'Jenis Kelamin', name: 'jk_id', allowBlank: true, width: 245});
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
        
        
        return [
            this.fields.wp_id,
			
			{
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'top', columnWidth:.6,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.rsp_name]
                },{
                    labelAlign: 'top', columnWidth:.4, layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.rsp_id_no]
                }]
            },
            {
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'top', columnWidth:1,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_id]
                }]
            },
			/*this.fields.param_id,*/
			{
                xtype: 'tabpanel',
                itemId: 'tabpanel-detail',
                activeTab: 0,
                defaults: {autoScroll:true},
                enableTabScroll:true,
                height: 200,
                items:[ 
                        /*alamat*/
                        {
                            title: 'Alamat',
                            itemId: 'alamat',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    
                                    this.fields.rsp_address_1,
			                        this.fields.rsp_address_2,
			                        this.fields.rsp_address_3,
			                        this.fields.rsp_phone_no,
			                        this.fields.rsp_mobile_no                  			
                                ]
                            }
                        },
                        /*Jabatan*/
                        {
                            title: 'Jabatan',
                            itemId: 'jabatan',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    this.fields.jobpos_id,
			                        this.fields.rsp_start_position_year,
			                        this.fields.rsp_end_position_year,
			                        this.fields.rsp_valid_from,
			                        this.fields.rsp_valid_to               			
                                ]
                            }
                        },
                        
                        /*Data Pribadi*/
                        /* Jenis Kelamin, Agama */
                        {
                            title: 'Data Pribadi',
                            itemId: 'data-pribadi',
                            items: {
                                xtype: 'panel', layout:'form', border:false, baseCls: 'x-plain',bodyStyle: 'padding:5px;',
                                items:[
                        		    this.fields.rsp_date_of_birth,
			                        this.fields.rsp_place_of_birth,
			                        this.fields.jk_id,
			                        this.fields.rsp_age,
			                        this.fields.agama_id,			
			                        this.fields.rsp_description              			
                                ]
                            }
                        }
                    ]
			},
		
        ];
    },
    focusField: function(){
    	this.fields.param_id.focus();
    }
});
