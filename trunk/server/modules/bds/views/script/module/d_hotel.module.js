/**
 * @class Bds.module.d_hotel
 * Module panel for table bds_d_hotel
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.d_hotel = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data Hotel',
    editTitle: 'Update Data Hotel',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_hotel.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_hotel({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_hotel();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_d_hotel', Bds.module.d_hotel);