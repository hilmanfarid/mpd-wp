/**
 * @class Bds.form.t_siswa
 * Form panel for table bds_t_siswa
 *
 * @since 02-11-2012 13:33:33
 * @author agung.hp
 */
Bds.form.t_siswa = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_siswa.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.t_siswa_id = new Ext.form.Hidden({fieldLabel: Bds.properties.t_siswa_id, name: 't_siswa_id', allowBlank: true});

        this.fields.d_sekolah_id = new Ext.form.Hidden({fieldLabel: Bds.properties.d_sekolah_id, name: 'd_sekolah_id', allowBlank: false});

        this.fields.tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.tahun, name: 'tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:50});

        this.fields.jml_masuk = new Ext.form.NumberField({fieldLabel: Bds.properties.jml_masuk, name: 'jml_masuk', allowBlank: false, allowDecimals: false, allowNegative: false, width:150});

        this.fields.jml_lulus = new Ext.form.NumberField({fieldLabel: Bds.properties.jml_lulus, name: 'jml_lulus', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.jml_aktif = new Ext.form.NumberField({fieldLabel: Bds.properties.jml_aktif, name: 'jml_aktif', allowBlank: true, allowDecimals: false, allowNegative: false, width:150});

        this.fields.description = new Ext.form.TextField({fieldLabel: 'Deskripsi', name: 'description', allowBlank: true, anchor: '95%'});

        
        return [
            this.fields.t_siswa_id,
			this.fields.d_sekolah_id,
			this.fields.tahun,
			this.fields.jml_masuk,
			this.fields.jml_lulus,
			this.fields.jml_aktif,
			this.fields.description
		];
    },
    focusField: function(){
    	this.fields.tahun.focus();
    }
});
