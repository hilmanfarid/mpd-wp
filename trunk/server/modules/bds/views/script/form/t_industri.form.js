/**
 * @class Bds.form.t_industri
 * Form panel for table bds_t_industri
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.form.t_industri = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_industri.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.industri_id = new Ext.form.Hidden({fieldLabel: Bds.properties.industri_id, name: 'industri_id', allowBlank: true});

        this.fields.type_id = new Ext.form.Hidden({name: 'type_id', allowBlank: true, width: 245});
        
        this.fields.industri_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.industri_tahun, name: 'industri_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:150});

        this.fields.industri_jml_unit = new Ext.form.NumberField({fieldLabel: Bds.properties.industri_jml_unit, name: 'industri_jml_unit', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.industri_peg_pria = new Ext.form.NumberField({fieldLabel: Bds.properties.industri_peg_pria, name: 'industri_peg_pria', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.industri_peg_wanita = new Ext.form.NumberField({fieldLabel: Bds.properties.industri_peg_wanita, name: 'industri_peg_wanita', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});
        
        return [
            this.fields.industri_id,
			this.fields.type_id,
			this.fields.industri_tahun,
			this.fields.industri_jml_unit,
			this.fields.industri_peg_pria,
			this.fields.industri_peg_wanita
        ];
    },
    focusField: function(){
    	this.fields.type_id.focus();
    }
});
