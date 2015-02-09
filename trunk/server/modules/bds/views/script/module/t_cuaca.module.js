/**
 * @class Bds.module.t_cuaca
 * Module panel for table bds_t_cuaca
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.module.t_cuaca = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_cuaca_addTitle,
    editTitle: Bds.properties.t_cuaca_editTitle,
    winWidth:565,
    winHeight:404,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_cuaca.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_cuaca({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_cuaca();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_cuaca', Bds.module.t_cuaca);