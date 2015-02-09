/**
 * @class Bds.form.t_modern_mart
 * Form panel for table bds_t_modern_mart
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.t_modern_mart = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_modern_mart.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.mmart_id = new Ext.form.Hidden({fieldLabel: Bds.properties.mmart_id, name: 'mmart_id', allowBlank: true});

        this.fields.type_id = new Ext.form.Hidden({name: 'type_id', allowBlank: true, width: 245});
        
        this.fields.mmart_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.mmart_tahun, name: 'mmart_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:150});

        this.fields.mmart_jml_unit = new Ext.form.NumberField({fieldLabel: Bds.properties.mmart_jml_unit, name: 'mmart_jml_unit', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.mmart_jml_peg_pria = new Ext.form.NumberField({fieldLabel: Bds.properties.mmart_jml_peg_pria, name: 'mmart_jml_peg_pria', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.mmart_jml_peg_wanita = new Ext.form.NumberField({fieldLabel: Bds.properties.mmart_jml_peg_wanita, name: 'mmart_jml_peg_wanita', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        
        return [
            this.fields.mmart_id,
			this.fields.type_id,
			this.fields.mmart_tahun,
			this.fields.mmart_jml_unit,
			this.fields.mmart_jml_peg_pria,
			this.fields.mmart_jml_peg_wanita			
        ];
    },
    focusField: function(){
    	this.fields.type_id.focus();
    }
});
