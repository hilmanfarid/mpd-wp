/**
 * @class Bds.form.d_pdpt_daerah
 * Form panel for table bds_d_pdpt_daerah
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.d_pdpt_daerah = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.d_pdpt_daerah.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.pdpt_daerah_id = new Ext.form.Hidden({fieldLabel: Bds.properties.pdpt_daerah_id, name: 'pdpt_daerah_id', allowBlank: true});

        this.fields.jenis_id = new Ext.form.Hidden({name: 'jenis_id', allowBlank: true, width: 245});
       
        this.fields.pdpt_daerah_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.pdpt_daerah_tahun, name: 'pdpt_daerah_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:80});

        this.fields.pdpt_daerah_target = new Ext.form.NumberField({fieldLabel: Bds.properties.pdpt_daerah_target, name: 'pdpt_daerah_target', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.pdpt_daerah_realisasi = new Ext.form.NumberField({fieldLabel: Bds.properties.pdpt_daerah_realisasi, name: 'pdpt_daerah_realisasi', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        return [
            this.fields.pdpt_daerah_id,
			this.fields.jenis_id,
			this.fields.pdpt_daerah_tahun,
			this.fields.pdpt_daerah_target,
			this.fields.pdpt_daerah_realisasi
        ];
    },
    focusField: function(){
    	this.fields.jenis_id.focus();
    }
});
