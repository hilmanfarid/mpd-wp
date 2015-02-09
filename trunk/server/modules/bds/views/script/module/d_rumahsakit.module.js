/**
 * @class Bds.module.d_rumahsakit
 * Module panel for table bds_d_rumahsakit
 *
 * @since 05-12-2012 12:48:54
 * @author agung.hp
 */
Bds.module.d_rumahsakit = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_rumahsakit_addTitle,
    editTitle: Bds.properties.d_rumahsakit_editTitle,
    winWidth:452,
    winHeight:399,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_rumahsakit.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_rumahsakit({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_rumahsakit();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_rumahsakit', Bds.module.d_rumahsakit);