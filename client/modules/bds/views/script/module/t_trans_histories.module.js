/**
 * @class Bds.module.t_trans_histories
 * Module panel for table t_trans_histories
 *
 * @since 23-10-2012 12:07:20
 */
Bds.module.t_trans_histories = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data t_trans_histories',
    editTitle: 'Update Data t_trans_histories',
    winWidth:550,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_trans_histories.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_trans_histories_new({border: false});
        this.initGridEvents();
        
        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_trans_histories();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_trans_histories', Bds.module.t_trans_histories);