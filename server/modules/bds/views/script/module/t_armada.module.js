/**
 * @class Bds.module.t_armada
 * Module panel for table bds_t_armada
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.module.t_armada = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_armada_addTitle,
    editTitle: Bds.properties.t_armada_editTitle,
    winWidth:397,
    winHeight:246,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_armada.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_armada({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_armada();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_armada', Bds.module.t_armada);