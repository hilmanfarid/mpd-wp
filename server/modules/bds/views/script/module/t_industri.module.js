/**
 * @class Bds.module.t_industri
 * Module panel for table bds_t_industri
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.t_industri = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_industri_addTitle,
    editTitle: Bds.properties.t_industri_editTitle,
    winWidth:471,
    winHeight:275,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_industri.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_industri({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_industri();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_industri', Bds.module.t_industri);