/**
 * @class Bds.module.t_siswa
 * Module panel for table bds_t_siswa
 *
 * @since 02-11-2012 13:33:33
 * @author agung.hp
 */
Bds.module.t_siswa = Ext.extend(Webi.module.Panel, {
    formTitle: '',
    addTitle: 'Tambah ',
    editTitle: 'Edit ',
    winWidth:440,
    winHeight:261,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        this.addTitle += this.formTitle;
        this.editTitle += this.formTitle;
        
        Bds.module.t_siswa.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_siswa({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_siswa();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_siswa', Bds.module.t_siswa);