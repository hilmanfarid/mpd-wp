/**
 * @class Bds.form.t_cuaca
 * Form panel for table bds_t_cuaca
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.form.t_cuaca = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_cuaca.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.t_cuaca_id = new Ext.form.Hidden({fieldLabel: Bds.properties.t_cuaca_id, name: 't_cuaca_id', allowBlank: true});

        this.fields.tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.tahun, name: 'tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:71});

        this.fields.bulan = new Bds.combo.Months({fieldLabel: Bds.properties.bulan, name: 'bulan', allowBlank: false});

        this.fields.penguapan = new Ext.form.NumberField({fieldLabel: Bds.properties.penguapan, name: 'penguapan', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.tekanan_udara = new Ext.form.NumberField({fieldLabel: Bds.properties.tekanan_udara, name: 'tekanan_udara', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.kelembaban = new Ext.form.NumberField({fieldLabel: Bds.properties.kelembaban, name: 'kelembaban', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.suhu_max = new Ext.form.NumberField({fieldLabel: Bds.properties.suhu_max, name: 'suhu_max', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.suhu_min = new Ext.form.NumberField({fieldLabel: Bds.properties.suhu_min, name: 'suhu_min', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.suhu_rata2 = new Ext.form.NumberField({fieldLabel: Bds.properties.suhu_rata2, name: 'suhu_rata2', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.curah_hujan = new Ext.form.NumberField({fieldLabel: Bds.properties.curah_hujan, name: 'curah_hujan', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.hari_hujan = new Ext.form.NumberField({fieldLabel: Bds.properties.hari_hujan, name: 'hari_hujan', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.prosen_sinar = new Ext.form.NumberField({fieldLabel: Bds.properties.prosen_sinar, name: 'prosen_sinar', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.angin_rata2 = new Ext.form.NumberField({fieldLabel: Bds.properties.angin_rata2, name: 'angin_rata2', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.arah_rata2 = new Bds.combo.ArahAngin({fieldLabel: Bds.properties.arah_rata2, name: 'arah_rata2', allowBlank: true});

        this.fields.angin_max = new Ext.form.NumberField({fieldLabel: Bds.properties.angin_max, name: 'angin_max', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.arah_max = new Bds.combo.ArahAngin({fieldLabel: Bds.properties.arah_max, name: 'arah_max', allowBlank: true});

        
        return [
            this.fields.t_cuaca_id,
			this.fields.tahun,
			this.fields.bulan,
			this.fields.penguapan,
			this.fields.tekanan_udara,
			this.fields.kelembaban,
			this.fields.suhu_max,
			this.fields.suhu_min,
			this.fields.suhu_rata2,
			this.fields.curah_hujan,
			this.fields.hari_hujan,
			this.fields.prosen_sinar,
			this.fields.angin_rata2,
			this.fields.arah_rata2,
			this.fields.angin_max,
			this.fields.arah_max
        ];
    },
    focusField: function(){
    	this.fields.tahun.focus();
    }
});
