/**
 * @class Bds.form.t_wisata_detail
 * Form panel for table bds_t_wisata_detail
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.t_wisata_detail = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_wisata_detail.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.wisata_det_id = new Ext.form.Hidden({fieldLabel: Bds.properties.wisata_det_id, name: 'wisata_det_id', allowBlank: true});

        this.fields.wisata_id = new Ext.form.Hidden({fieldLabel: Bds.properties.wisata_id, name: 'wisata_id', allowBlank: true});

        this.fields.wisata_det_tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.wisata_det_tahun, name: 'wisata_det_tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:50});

        this.fields.wisata_det_jml_peg_pria = new Ext.form.NumberField({fieldLabel: Bds.properties.wisata_det_jml_peg_pria, name: 'wisata_det_jml_peg_pria', allowBlank: true, allowDecimals: false, allowNegative: false, width:160});

        this.fields.wisata_det_jml_peg_wanita = new Ext.form.NumberField({fieldLabel: Bds.properties.wisata_det_jml_peg_wanita, name: 'wisata_det_jml_peg_wanita', allowBlank: true, allowDecimals: false, allowNegative: false, width:160});

        this.fields.wisata_det_jml_wisman = new Ext.form.NumberField({fieldLabel: Bds.properties.wisata_det_jml_wisman, name: 'wisata_det_jml_wisman', allowBlank: true, allowDecimals: false, allowNegative: false, width:160});

        this.fields.wisata_det_jml_wisdom = new Ext.form.NumberField({fieldLabel: Bds.properties.wisata_det_jml_wisdom, name: 'wisata_det_jml_wisdom', allowBlank: true, allowDecimals: false, allowNegative: false, width:160});

        return [
            this.fields.wisata_det_id,
			this.fields.wisata_id,
			this.fields.wisata_det_tahun,
			this.fields.wisata_det_jml_peg_pria,
			this.fields.wisata_det_jml_peg_wanita,
			this.fields.wisata_det_jml_wisman,
			this.fields.wisata_det_jml_wisdom
        ];
    },
    focusField: function(){
    	this.fields.wisata_id.focus();
    }
});
