/**
 * @class Bds.module.d_puskesmas
 * Module panel for table bds_d_puskesmas
 *
 * @since 06-12-2012 12:02:05
 * @author agung.hp
 */
Bds.module.d_puskesmas = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_puskesmas_addTitle,
    editTitle: Bds.properties.d_puskesmas_editTitle,
    winWidth:399,
    winHeight:308,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_puskesmas.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_puskesmas({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_puskesmas();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_puskesmas', Bds.module.d_puskesmas);