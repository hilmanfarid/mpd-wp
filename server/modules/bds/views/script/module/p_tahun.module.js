/**
 * @class Bds.module.p_tahun
 * Module panel for table bds_p_tahun
 *
 * @since 01-11-2012 10:52:31
 * @author agung.hp
 */
Bds.module.p_tahun = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_tahun_addTitle,
    editTitle: Bds.properties.p_tahun_editTitle,
    winWidth:400,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_tahun.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_tahun({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_tahun();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_p_tahun', Bds.module.p_tahun);