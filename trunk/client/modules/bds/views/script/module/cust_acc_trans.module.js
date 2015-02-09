/**
 * @class Bds.module.cust_acc_trans
 * Module panel for table cust_acc_trans
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.cust_acc_trans = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data Transaksi',
    editTitle: 'Update Data Transaksi',
    winWidth:550,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.cust_acc_trans.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.cust_acc_trans({border: false});
        this.initGridEvents();
        
        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.cust_acc_trans();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_cust_acc_trans', Bds.module.cust_acc_trans);