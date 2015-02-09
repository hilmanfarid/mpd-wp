/**
 * @class Bds.form.t_agr_komod_prod
 * Form panel for table bds_t_agr_komod_prod
 *
 * @since 13-12-2012 16:29:27
 * @author agung.hp
 */
Bds.form.t_agr_komod_prod = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_agr_komod_prod.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.t_agr_komod_prod_id = new Ext.form.Hidden({fieldLabel: Bds.properties.t_agr_komod_prod_id, name: 't_agr_komod_prod_id', allowBlank: true});

        this.fields.d_agr_komiditas_id = new Ext.form.Hidden({fieldLabel: Bds.properties.d_agr_komiditas_id, name: 'd_agr_komiditas_id', allowBlank: true});

        this.fields.tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.tahun, name: 'tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:80});

        this.fields.luas_tanam = new Ext.form.NumberField({fieldLabel: Bds.properties.luas_tanam, name: 'luas_tanam', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.luas_panen = new Ext.form.NumberField({fieldLabel: Bds.properties.luas_panen, name: 'luas_panen', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.productivity = new Ext.form.NumberField({fieldLabel: Bds.properties.productivity, name: 'productivity', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});
        
        this.fields.produksi = new Ext.form.NumberField({fieldLabel: 'Produksi', name: 'produksi', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.description = new Ext.form.TextField({fieldLabel: Bds.properties.description, name: 'description', allowBlank: true, anchor: '95%'});

        
        return [
            this.fields.t_agr_komod_prod_id,
			this.fields.d_agr_komiditas_id,
			this.fields.tahun,
			this.fields.luas_tanam,
			this.fields.luas_panen,
			this.fields.productivity,
			this.fields.produksi,
			this.fields.description
        ];
    },
    focusField: function(){
    	this.fields.d_agr_komiditas_id.focus();
    }
});
