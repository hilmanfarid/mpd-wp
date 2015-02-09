/**
 * @class Bds.form.p_tahun
 * Form panel for table bds_p_tahun
 *
 * @since 01-11-2012 10:52:31
 * @author agung.hp
 */
Bds.form.p_tahun = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_tahun.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.tahun_id = new Ext.form.NumberField({fieldLabel: Bds.properties.tahun_id, name: 'tahun_id', allowBlank: true});
        this.fields.tahun_aktif = new Bds.combo.YesNo({fieldLabel: Bds.properties.tahun_aktif, name: 'tahun_aktif', allowBlank: false});
        
        return [
            this.fields.tahun_id,
			this.fields.tahun_aktif
		];
    },
    focusField: function(){
    	this.fields.tahun_aktif.focus();
    }
});
