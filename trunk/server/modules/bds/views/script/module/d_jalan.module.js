/**
 * @class Bds.module.d_jalan
 * Module panel for table bds_d_jalan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.d_jalan = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data jalan',
    editTitle: 'Update Data jalan',
    winWidth:546,
    winHeight:358,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_jalan.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_jalan({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_jalan();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_jalan', Bds.module.d_jalan);