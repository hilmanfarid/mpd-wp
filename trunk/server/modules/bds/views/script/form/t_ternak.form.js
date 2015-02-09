/**
 * @class Bds.form.t_ternak
 * Form panel for table bds_t_ternak
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.t_ternak = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_ternak.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.ternak_id = new Ext.form.Hidden({fieldLabel: Bds.properties.ternak_id, name: 'ternak_id', allowBlank: true});

        this.fields.type_id = new Ext.form.Hidden({fieldLabel: Bds.properties.type_id, name: 'type_id', allowBlank: true});

        this.fields.ternak_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.ternak_tahun, name: 'ternak_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:100});

        this.fields.ternak_populasi = new Ext.form.NumberField({fieldLabel: Bds.properties.ternak_populasi, name: 'ternak_populasi', allowBlank: true, allowDecimals: true, allowNegative: false, width:220});

        this.fields.ternak_jml_potong = new Ext.form.NumberField({fieldLabel: Bds.properties.ternak_jml_potong, name: 'ternak_jml_potong', allowBlank: true, allowDecimals: true, allowNegative: false, width:220});

        this.fields.ternak_produksi_daging = new Ext.form.NumberField({fieldLabel: Bds.properties.ternak_produksi_daging, name: 'ternak_produksi_daging', allowBlank: true, allowDecimals: true, allowNegative: false, width:220});

        
        return [
            this.fields.ternak_id,
            this.fields.type_id,
			this.fields.ternak_tahun,
			this.fields.ternak_populasi,
			this.fields.ternak_jml_potong,
			this.fields.ternak_produksi_daging
		];
    },
    focusField: function(){
    	this.fields.type_id.focus();
    }
});
