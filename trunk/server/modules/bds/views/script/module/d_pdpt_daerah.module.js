/**
 * @class Bds.module.d_pdpt_daerah
 * Module panel for table bds_d_pdpt_daerah
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.d_pdpt_daerah = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_pdpt_daerah_addTitle,
    editTitle: Bds.properties.d_pdpt_daerah_editTitle,
    winWidth:475,
    winHeight:242,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_pdpt_daerah.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_pdpt_daerah({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_pdpt_daerah();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_pdpt_daerah', Bds.module.d_pdpt_daerah);