/**
 * @class Bds.module.p_wilayah_person
 * Module panel for table bds_p_wilayah_person
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_wilayah_person = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Pejabat Daerah',
    editTitle: 'Edit Pejabat Daerah',
    winWidth:683,
    winHeight:403,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_wilayah_person.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_wilayah_person({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_wilayah_person();
		this.initFormEvents();
				
		return this.form;
    }
});

Ext.reg('module_p_wilayah_person', Bds.module.p_wilayah_person);