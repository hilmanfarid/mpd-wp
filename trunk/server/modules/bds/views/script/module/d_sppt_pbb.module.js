/**
 * @class Bds.module.d_sppt_pbb
 * Module panel for table bds_d_sppt_pbb
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.d_sppt_pbb = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_sppt_pbb_addTitle,
    editTitle: Bds.properties.d_sppt_pbb_editTitle,
    winWidth:400,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_sppt_pbb.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_sppt_pbb({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_sppt_pbb();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_sppt_pbb', Bds.module.d_sppt_pbb);