/**
 * @class Bds.module.t_wisata_detail
 * Module panel for table bds_t_wisata_detail
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.module.t_wisata_detail = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_wisata_detail_addTitle,
    editTitle: Bds.properties.t_wisata_detail_editTitle,
    winWidth:305,
    winHeight:300,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_wisata_detail.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_wisata_detail({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_wisata_detail();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_wisata_detail', Bds.module.t_wisata_detail);