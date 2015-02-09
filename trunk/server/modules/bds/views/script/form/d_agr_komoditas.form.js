/**
 * @class Bds.form.d_agr_komoditas
 * Form panel for table bds_d_agr_komoditas
 *
 * @since 13-12-2012 16:29:27
 * @author agung.hp
 */
Bds.form.d_agr_komoditas = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_agr_komoditas.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.d_agr_komiditas_id = new Ext.form.Hidden({fieldLabel: Bds.properties.d_agr_komiditas_id, name: 'd_agr_komiditas_id', allowBlank: true});

        this.fields.type_id = new Bds.combo.p_parameter({fieldLabel: 'Jenis Tanaman', name: 'type_id', allowBlank: true, width:245});
        
        /* load record event */
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                this.fields.type_id.store.baseParams.kode_type = 'JENIS TANAMAN';
                this.fields.type_id.getStore().load({params: {param_id:record.get('type_id')}});
            }else{
                this.fields.type_id.store.baseParams.kode_type = 'JENIS TANAMAN';
                delete this.fields.type_id.lastQuery;
                this.fields.type_id.doQuery('', true);                
                
            }
        }, this);
        
        this.fields.code = new Ext.form.TextField({fieldLabel: Bds.properties.code, name: 'code', allowBlank: true, width: 245});

        this.fields.komoditas_name = new Ext.form.TextField({fieldLabel: Bds.properties.komoditas_name, name: 'komoditas_name', allowBlank: false, width: 245});

        this.fields.phone_no = new Ext.form.TextField({fieldLabel: Bds.properties.phone_no, name: 'phone_no', allowBlank: true, width: 245});

        this.fields.website = new Ext.form.TextField({fieldLabel: Bds.properties.website, name: 'website', allowBlank: true, width: 245});

        this.fields.listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.listing_no, name: 'listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.description = new Ext.form.TextField({fieldLabel: Bds.properties.description, name: 'description', allowBlank: true, width: 245});

        return [
            this.fields.d_agr_komiditas_id,
			this.fields.code,
			this.fields.komoditas_name,
			this.fields.type_id,
			this.fields.listing_no,
			this.fields.description
        ];
    },
    focusField: function(){
    	this.fields.type_id.focus();
    }
});
