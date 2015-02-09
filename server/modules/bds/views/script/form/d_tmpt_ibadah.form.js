/**
 * @class Bds.form.d_tmpt_ibadah
 * Form panel for table bds_d_tmpt_ibadah
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
Bds.form.d_tmpt_ibadah = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_tmpt_ibadah.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.tibdh_id = new Ext.form.Hidden({fieldLabel: Bds.properties.tibdh_id, name: 'tibdh_id', allowBlank: true});

        this.fields.agama_id = new Ext.form.Hidden({name: 'tibdh_id', allowBlank: true});
        
        this.fields.kecamatan_id = new Bds.combo.p_wilayah({fieldLabel: 'Kecamatan', name: 'kecamatan_id', allowBlank: true, width: 245});
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

        this.fields.tibdh_code = new Ext.form.TextField({fieldLabel: 'Kode Tempat Ibadah', name: 'tibdh_code', allowBlank: true, anchor: '95%'});

        this.fields.tibdh_name = new Ext.form.TextField({fieldLabel: 'Nama Tempat Ibadah', name: 'tibdh_name', allowBlank: false, anchor: '95%'});

        this.fields.tibdh_alamat = new Ext.form.TextField({fieldLabel: Bds.properties.tibdh_alamat, name: 'tibdh_alamat', allowBlank: true, anchor: '95%'});

        this.fields.tibdh_kode_pos = new Ext.form.TextField({fieldLabel: Bds.properties.tibdh_kode_pos, name: 'tibdh_kode_pos', allowBlank: true, anchor: '95%'});

        this.fields.tibdh_description = new Ext.form.TextField({fieldLabel: Bds.properties.tibdh_description, name: 'tibdh_description', allowBlank: true, anchor: '95%'});

        this.fields.tibdh_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.tibdh_listing_no, name: 'tibdh_listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        
        return [
            this.fields.tibdh_id,
			this.fields.agama_id,
			this.fields.tibdh_code,
			this.fields.tibdh_name,
			this.fields.tibdh_alamat,
			this.fields.kecamatan_id,
			this.fields.tibdh_kode_pos,
			this.fields.tibdh_description,
			this.fields.tibdh_listing_no
        ];
    },
    focusField: function(){
    	this.fields.agama_id.focus();
    }
});
