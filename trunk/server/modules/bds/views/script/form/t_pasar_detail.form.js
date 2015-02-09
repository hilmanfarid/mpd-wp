/**
 * @class Bds.form.t_pasar_detail
 * Form panel for table bds_t_pasar_detail
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.t_pasar_detail = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_pasar_detail.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.pasar_det_id = new Ext.form.Hidden({fieldLabel: Bds.properties.pasar_det_id, name: 'pasar_det_id', allowBlank: true});

        this.fields.pasar_id = new Ext.form.Hidden({fieldLabel: Bds.properties.pasar_id, name: 'pasar_id', allowBlank: true});

        this.fields.pasar_det_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.pasar_det_tahun, name: 'pasar_det_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:80});

        this.fields.pasar_det_jml_ruang = new Ext.form.NumberField({fieldLabel: Bds.properties.pasar_det_jml_ruang, name: 'pasar_det_jml_ruang', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.pasar_det_jml_pedagang_aktif = new Ext.form.NumberField({fieldLabel: Bds.properties.pasar_det_jml_pedagang_aktif, name: 'pasar_det_jml_pedagang_aktif', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.pasar_det_jml_pedagang_pasif = new Ext.form.NumberField({fieldLabel: Bds.properties.pasar_det_jml_pedagang_pasif, name: 'pasar_det_jml_pedagang_pasif', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        
        return [
            this.fields.pasar_det_id,
			this.fields.pasar_id,
			this.fields.pasar_det_tahun,
			this.fields.pasar_det_jml_ruang,
			this.fields.pasar_det_jml_pedagang_aktif,
			this.fields.pasar_det_jml_pedagang_pasif
        ];
    },
    focusField: function(){
    	this.fields.pasar_id.focus();
    }
});
