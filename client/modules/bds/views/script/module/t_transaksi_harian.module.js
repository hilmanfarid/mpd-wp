/**
 * @class Bds.module.t_transaksi_harian
 * Module panel for table t_transaksi_harian
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.t_transaksi_harian = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data t_transaksi_harian',
    editTitle: 'Update Data t_transaksi_harian',
    winWidth:550,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_transaksi_harian.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_transaksi_harian({border: false});
        this.initGridEvents();

        return this.grid;
    }/*,
    buildForm : function(){
        this.form = new Bds.form.t_transaksi_harian();
		this.initFormEvents();
		
		
		return this.form;
    }*/
});

Ext.reg('module_t_transaksi_harian', Bds.module.t_transaksi_harian);