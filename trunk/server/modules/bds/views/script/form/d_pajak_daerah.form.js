/**
 * @class Bds.form.d_pajak_daerah
 * Form panel for table bds_d_pajak_daerah
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.d_pajak_daerah = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_pajak_daerah.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.pjk_daerah_id = new Ext.form.Hidden({fieldLabel: Bds.properties.pjk_daerah_id, name: 'pjk_daerah_id', allowBlank: true});

        this.fields.jenis_id = new Ext.form.Hidden({name: 'jenis_id', allowBlank: true, width: 245});
        

        this.fields.pjk_daerah_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.pjk_daerah_tahun, name: 'pjk_daerah_tahun', allowBlank: true, allowDecimals: false, allowNegative: false, width:80});

        this.fields.pjk_daerah_target = new Ext.form.NumberField({fieldLabel: Bds.properties.pjk_daerah_target, name: 'pjk_daerah_target', allowBlank: false, allowDecimals: true, allowNegative: false, width:150});

        this.fields.pjk_daerah_realisasi = new Ext.form.NumberField({fieldLabel: Bds.properties.pjk_daerah_realisasi, name: 'pjk_daerah_realisasi', allowBlank: false, allowDecimals: true, allowNegative: false, width:150});

        return [
            this.fields.pjk_daerah_id,
			this.fields.jenis_id,
			this.fields.pjk_daerah_tahun,
			this.fields.pjk_daerah_target,
			this.fields.pjk_daerah_realisasi
			
        ];
    },
    focusField: function(){
    	this.fields.jenis_id.focus();
    }
});
