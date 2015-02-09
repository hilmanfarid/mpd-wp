/**
 * @class Bds.form.d_bandung
 * Form panel for table bds_d_bandung
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
Bds.form.d_bandung = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    defaultImageHolderContent: '<div style="text-align:center;padding-top:60px;color:#aaa;">Foto Anggota<br/>Belum Diupload</div>',
    initComponent : function() {
        // super
        Bds.form.d_bandung.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        this.store = new Bds.store.d_bandung();
        
        this.store.load();
        
        this.fields.bandung_id = new Ext.form.Hidden({fieldLabel: Bds.properties.bandung_id, name: 'bandung_id', allowBlank: true});

        this.fields.bandung_luas_area = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_luas_area, name: 'bandung_luas_area', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_lintang1 = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_lintang1, name: 'bandung_lintang1', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_lintang2 = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_lintang2, name: 'bandung_lintang2', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_bujur1 = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_bujur1, name: 'bandung_bujur1', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_bujur2 = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_bujur2, name: 'bandung_bujur2', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_tinggi_max = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_tinggi_max, name: 'bandung_tinggi_max', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_tinggi_min = new Ext.form.NumberField({fieldLabel: Bds.properties.bandung_tinggi_min, name: 'bandung_tinggi_min', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.bandung_description = new Ext.form.TextArea({fieldLabel: Bds.properties.bandung_description, name: 'bandung_description', allowBlank: true, anchor: '95%'});

        this.fields.creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.creation_date, name: 'creation_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.created_by = new Ext.form.TextField({fieldLabel: Bds.properties.created_by, name: 'created_by', allowBlank: true, anchor: '95%'});

        this.fields.updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.updated_date, name: 'updated_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.updated_by, name: 'updated_by', allowBlank: true, anchor: '95%'});
        
        this.store.on('load',function(store,recs,op){
        	this.getForm().loadRecord(new this.store.recordType(recs[0].data), 'create');
        	this.imageHolder.update('<div style="padding-top:1px;padding-left:4px;"><img src="themes/default/images/peta_bandung.jpg" alt="Foto Anggota" width="650" height="450" /></div>');
        },this);
        
        this.imageHolder = new Ext.Panel({border:false,html: '', height:430, width: 800});
        return [
			{
				xtype:'panel',
	            layout: 'column',
	            border:false,
	            items:[
	                {columnWidth: 0.3, layout: 'form', baseCls: 'x-plain', labelWidth: 90,
	                            items: [
	                            		this.fields.bandung_id,
										this.fields.bandung_luas_area,
										this.fields.bandung_lintang1,
										this.fields.bandung_lintang2,
										this.fields.bandung_bujur1,
										this.fields.bandung_bujur2,
										this.fields.bandung_tinggi_max,
										this.fields.bandung_tinggi_min,
										this.fields.bandung_description	
	                            ]
	                },      
	                {columnWidth: 0.7, layout: 'form', baseCls: 'x-plain', labelWidth: 50,
	                            items: [this.imageHolder]
	                },
	            ]
	        },
	        
        ];
    },
    focusField: function(){
    	this.fields.bandung_luas_area.focus();
    },
    onCreate : function(btn, ev) {
        if (!this.getForm().isValid()) {
            Ext.MessageBox.alert("Perhatian", "Data yang anda masukan belum benar. Mohon periksa kembali");
            return false;
        }
		var rec = new this.store.recordType(this.getForm().getValues());
		this.store.removeAll();
		this.store.insert(0, rec);
		this.store.save();
    },
	buildUI: function(){
        this.btnSave = new Ext.Button({
        	itemId: 'btnSave',
            text: 'Simpan',
            iconCls: 'icon-save',
            handler: this.onCreate,
            scope: this
        });
        
        this.btnUpdate = new Ext.Button({
        	itemId: 'btnUpdate',
            text: 'Update',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this,
            hidden: true
        });
        
        this.btnCancel = new Ext.Button({
        	itemId: 'btnCancel',
            text: 'Tutup',
            iconCls: 'icon-closewin',
            handler: this.onCancel,
            scope: this
        });
        
        return [this.btnSave, this.btnUpdate];
    }
});
