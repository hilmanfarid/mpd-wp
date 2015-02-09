/**
 * @class Bds.module.bphtb_registration
 * Module panel for table bphtb_registration
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.bphtb_registration = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data bphtb_registration',
    editTitle: 'Update Data bphtb_registration',
    winWidth:550,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.bphtb_registration.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.bphtb_registration({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.bphtb_registration();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_bphtb_registration', Bds.module.bphtb_registration);