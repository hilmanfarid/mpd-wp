/**
 * @class Bds.module.branch
 * Module panel for table branch
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.branch = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data Branch',
    editTitle: 'Update Data Branch',
    winWidth:550,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.branch.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.branch({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.branch();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_branch', Bds.module.branch);