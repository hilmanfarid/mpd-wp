/**
 * @class Bds.module.t_pasar_detail
 * Module panel for table bds_t_pasar_detail
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.t_pasar_detail = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_pasar_detail_addTitle,
    editTitle: Bds.properties.t_pasar_detail_editTitle,
    winWidth:413,
    winHeight:248,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_pasar_detail.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_pasar_detail({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_pasar_detail();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_pasar_detail', Bds.module.t_pasar_detail);