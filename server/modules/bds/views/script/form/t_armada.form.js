/**
 * @class Bds.form.t_armada
 * Form panel for table bds_t_armada
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.t_armada = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_armada.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.armada_id = new Ext.form.Hidden({fieldLabel: Bds.properties.armada_id, name: 'armada_id', allowBlank: true});

        this.fields.trayek_id = new Ext.form.Hidden({fieldLabel: Bds.properties.trayek_id, name: 'trayek_id', allowBlank: true});

        this.fields.armada_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.armada_tahun, name: 'armada_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:100});

        this.fields.armada_jml = new Ext.form.NumberField({fieldLabel: 'Jumlah Armada', name: 'armada_jml', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});
        
        this.fields.armada_jml_angkot = new Ext.form.NumberField({fieldLabel: Bds.properties.armada_jml_angkot, name: 'armada_jml_angkot', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.armada_jml_biskota = new Ext.form.NumberField({fieldLabel: Bds.properties.armada_jml_biskota, name: 'armada_jml_biskota', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.armada_jml_lain = new Ext.form.NumberField({fieldLabel: Bds.properties.armada_jml_lain, name: 'armada_jml_lain', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        
        return [
            this.fields.armada_id,
			this.fields.trayek_id,
			this.fields.armada_tahun,
			this.fields.armada_jml,
			this.fields.armada_jml_angkot,
			this.fields.armada_jml_biskota,
			this.fields.armada_jml_lain
		];
    },
    focusField: function(){
    	this.fields.trayek_id.focus();
    }
});
