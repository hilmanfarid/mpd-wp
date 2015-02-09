/**
 * @class Bds.form.t_rpddk
 * Form panel for table bds_t_rpddk
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.t_rpddk = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_rpddk.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.t_rpddk_id = new Ext.form.Hidden({fieldLabel: Bds.properties.t_rpddk_id, name: 't_rpddk_id', allowBlank: true});

        this.fields.jenis_data = new Bds.combo.JenisData({fieldLabel:'Jenis Data Per', name:'jenisdata', disabled: true,emptyText: 'Pilih Jenis Data',width: 90});

        this.fields.kelompok_id = new Bds.combo.p_parameter({fieldLabel: Bds.properties.kelompok_id, name: 'kelompok_id', allowBlank: false, width: 245});
		this.on('loadrecord', function(form, record, actionType){
			var jenis = Array("","21","4")
            if (actionType == 'update'){
                this.fields.kelompok_id.store.baseParams.ptype_id = jenis[this.fields.jenis_data.getValue()];
                this.fields.kelompok_id.getStore().load({params: {ptype_id:jenis[this.fields.jenis_data.getValue()]}});
            }else{
                this.fields.kelompok_id.store.baseParams.ptype_id = jenis[this.fields.jenis_data.getValue()];
                delete this.fields.kelompok_id.lastQuery;
                this.fields.kelompok_id.doQuery('', true);
            }
        }, this);
        this.fields.tahun = new Ext.form.TextField({fieldLabel: Bds.properties.tahun, name: 'tahun', allowBlank: true, width: 80});

        this.fields.laki = new Ext.form.TextField({fieldLabel: Bds.properties.laki, name: 'laki', allowBlank: true, width: 80});

        this.fields.perempuan = new Ext.form.TextField({fieldLabel: Bds.properties.perempuan, name: 'perempuan', allowBlank: true, width: 80});
        return [
            this.fields.t_rpddk_id,           
			this.fields.jenis_data,                      
			this.fields.kelompok_id,                      
			this.fields.tahun,                       
			this.fields.laki,
			this.fields.perempuan
        ];
    },
    focusField: function(){
    	this.fields.t_rpddk_id.focus();
    }
});
