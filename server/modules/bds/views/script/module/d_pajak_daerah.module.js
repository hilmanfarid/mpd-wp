/**
 * @class Bds.module.d_pajak_daerah
 * Module panel for table bds_d_pajak_daerah
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.d_pajak_daerah = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_pajak_daerah_addTitle,
    editTitle: Bds.properties.d_pajak_daerah_editTitle,
    winWidth:400,
    winHeight:201,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_pajak_daerah.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_pajak_daerah({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_pajak_daerah();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_pajak_daerah', Bds.module.d_pajak_daerah);