/**
 * @class Bds.module.d_tmpt_ibadah
 * Module panel for table bds_d_tmpt_ibadah
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
Bds.module.d_tmpt_ibadah = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_tmpt_ibadah_addTitle,
    editTitle: Bds.properties.d_tmpt_ibadah_editTitle,
    winWidth:459,
    winHeight:316,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_tmpt_ibadah.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_tmpt_ibadah({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_tmpt_ibadah();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_tmpt_ibadah', Bds.module.d_tmpt_ibadah);