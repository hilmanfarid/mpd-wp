/**
 * @class Bds.module.t_ternak
 * Module panel for table bds_t_ternak
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.module.t_ternak = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_ternak_addTitle,
    editTitle: Bds.properties.t_ternak_editTitle,
    winWidth:429,
    winHeight:221,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_ternak.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_ternak({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_ternak();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_ternak', Bds.module.t_ternak);