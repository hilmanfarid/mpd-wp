/**
 * @class Bds.module.t_agr_komod_prod
 * Module panel for table bds_t_agr_komod_prod
 *
 * @since 13-12-2012 16:29:27
 * @author agung.hp
 */
Bds.module.t_agr_komod_prod = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_agr_komod_prod_addTitle,
    editTitle: Bds.properties.t_agr_komod_prod_editTitle,
    winWidth:497,
    winHeight:260,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_agr_komod_prod.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_agr_komod_prod({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_agr_komod_prod();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_agr_komod_prod', Bds.module.t_agr_komod_prod);