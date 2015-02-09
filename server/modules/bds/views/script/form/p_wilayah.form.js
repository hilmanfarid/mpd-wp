/**
 * @class Bds.form.p_wilayah
 * Form panel for table bds_p_wilayah
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_wilayah = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_wilayah.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.wilayah_id = new Ext.form.Hidden({fieldLabel: Bds.properties.wilayah_id, name: 'wilayah_id', allowBlank: true});
        
        this.fields.wilayah_pid = new Bds.combo.p_wilayah({fieldLabel:'Parent Wilayah', name: 'wilayah_pid', allowBlank: true, width: 245});
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.wilayah_pid.store.baseParams.comboDisplay = 'Y';
                
                this.fields.wilayah_pid.getStore().load({params: {wilayah_pid:record.get('wilayah_pid')}});
                this.fields.wilayah_pid.disable();
                
                this.fields.tipe_wilayah.setValue( record.get('status_parent') );
            }else{
                delete this.fields.wilayah_pid.lastQuery;
                this.fields.wilayah_pid.doQuery('', true);
                
                this.fields.wilayah_pid.store.baseParams.comboDisplay = 'Y';
                this.fields.wilayah_pid.store.load();
                
                this.fields.wilayah_pid.enable();
            }
        }, this);
        this.fields.tipe_wilayah = new Bds.combo.TipeWilayah({fieldLabel:'Tipe Parent', readOnly:true, width:150, style:'background:#C0C0C0;'});
        
        this.fields.wilayah_pid.on('select',function(combo,rec,idx){
            this.fields.tipe_wilayah.setValue( rec.get('wilayah_status') );  
            this.fields.wilayah_kode.setValue( rec.get('wilayah_kode') );
                        
            var v = this.fields.tipe_wilayah.getValue();
            var record = this.fields.tipe_wilayah.findRecord(this.fields.tipe_wilayah.valueField || this.fields.tipe_wilayah.displayField, v);
            var index = this.fields.tipe_wilayah.store.indexOf(record);
            
            var combo = this.fields.wilayah_status;
            combo.setValue(combo.getStore().getAt(index+1).get(combo.valueField));
            
        },this);
        
        this.fields.wilayah_pid.on('blur',function(combo){
            if(Ext.isEmpty(combo.getValue())) {
                this.fields.tipe_wilayah.reset(); 
                this.fields.wilayah_status.reset();        
            }
        },this);
        
        this.fields.wilayah_kode = new Ext.form.TextField({fieldLabel: Bds.properties.wilayah_kode, name: 'wilayah_kode', allowBlank: false, width:150, style:'background:#AAFFAA;'});

        this.fields.wilayah_nama = new Ext.form.TextField({fieldLabel: Bds.properties.wilayah_nama, name: 'wilayah_nama', allowBlank: false, anchor: '95%', style:'background:#AAFFAA;'});

        this.fields.wilayah_description = new Ext.form.TextArea({fieldLabel: Bds.properties.wilayah_description, name: 'wilayah_description', allowBlank: true, anchor: '95%' });

        this.fields.wilayah_status = new Bds.combo.TipeWilayah({fieldLabel: Bds.properties.wilayah_status, name: 'wilayah_status', allowBlank: false, width:150, style:'background:#AAFFAA;'});

        
        return [
            this.fields.wilayah_id,
            {
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'left', columnWidth:.6,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_pid]
                },{
                    labelAlign: 'left', columnWidth:.4, labelWidth:75, layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.tipe_wilayah]
                }]
            },
			this.fields.wilayah_kode,
			this.fields.wilayah_nama,
			this.fields.wilayah_status		
        ];
    },
    focusField: function(){
    	this.fields.wilayah_kode.focus();
    }
});
