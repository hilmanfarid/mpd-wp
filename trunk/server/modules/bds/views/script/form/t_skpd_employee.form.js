/**
 * @class Bds.form.t_skpd_employee
 * Form panel for table bds_t_skpd_employee
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.form.t_skpd_employee = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_skpd_employee.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.t_skpd_employee_id = new Ext.form.Hidden({fieldLabel: Bds.properties.t_skpd_employee_id, name: 't_skpd_employee_id', allowBlank: true});

        this.fields.d_skpd_id = new Ext.form.Hidden({fieldLabel: Bds.properties.d_skpd_id, name: 'd_skpd_id', allowBlank: true});

        this.fields.tahun = new Ext.form.NumberField({fieldLabel: Bds.properties.tahun, name: 'tahun', allowBlank: false, allowDecimals: false, allowNegative: false, width:71});

        this.fields.jml_peg_organik = new Ext.form.NumberField({fieldLabel: Bds.properties.jml_peg_organik, name: 'jml_peg_organik', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.jml_peg_non_organik = new Ext.form.NumberField({fieldLabel: Bds.properties.jml_peg_non_organik, name: 'jml_peg_non_organik', allowBlank: true, allowDecimals: true, allowNegative: false, width:150});

        this.fields.description = new Ext.form.TextField({fieldLabel: Bds.properties.description, name: 'description', allowBlank: true, anchor: '95%'});

        
        return [
            this.fields.t_skpd_employee_id,
			this.fields.d_skpd_id,
			this.fields.tahun,
			this.fields.jml_peg_organik,
			this.fields.jml_peg_non_organik,
			this.fields.description
        ];
    },
    focusField: function(){
    	this.fields.d_skpd_id.focus();
    }
});
