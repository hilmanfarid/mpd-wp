/**
 * @class Bds.form.d_sppt_pbb
 * Form panel for table bds_d_sppt_pbb
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.d_sppt_pbb = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_sppt_pbb.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.sppt_pbb_id = new Ext.form.Hidden({fieldLabel: Bds.properties.sppt_pbb_id, name: 'sppt_pbb_id', allowBlank: true});

        this.fields.kecamatan_id = new Ext.form.Hidden({fieldLabel: Bds.properties.kecamatan_id, name: 'kecamatan_id', allowBlank: true});

        this.fields.sppt_pbb_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.sppt_pbb_tahun, name: 'sppt_pbb_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:80});

        this.fields.sppt_pbb_buah = new Ext.form.NumberField({fieldLabel: Bds.properties.sppt_pbb_buah, name: 'sppt_pbb_buah', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.sppt_pbb_terhutang = new Ext.form.NumberField({fieldLabel: Bds.properties.sppt_pbb_terhutang, name: 'sppt_pbb_terhutang', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        
        return [
            this.fields.sppt_pbb_id,
			this.fields.kecamatan_id,
			this.fields.sppt_pbb_tahun,
			this.fields.sppt_pbb_buah,
			this.fields.sppt_pbb_terhutang
		];
    },
    focusField: function(){
    	this.fields.kecamatan_id.focus();
    }
});
