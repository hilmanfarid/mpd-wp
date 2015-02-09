/**
 * @class Bds.module.d_warga
 * Module panel for table bds_d_warga
 *
 * @since 31-10-2012 11:02:06
 * @author agung.hp
 */
Bds.module.d_warga = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_warga_addTitle,
    editTitle: Bds.properties.d_warga_editTitle,
    winWidth:658,
    winHeight:464,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_warga.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_warga({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.anggota_keluarga();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_warga', Bds.module.d_warga);