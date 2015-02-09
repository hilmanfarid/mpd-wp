/**
 * @class Bds.module.t_modern_mart
 * Module panel for table bds_t_modern_mart
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.t_modern_mart = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_modern_mart_addTitle,
    editTitle: Bds.properties.t_modern_mart_editTitle,
    winWidth:409,
    winHeight:263,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_modern_mart.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_modern_mart({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_modern_mart();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_modern_mart', Bds.module.t_modern_mart);