/**
 * @class Bds.module.kepala_keluarga
 * Module panel for table bds_kepala_keluarga
 *
 * @since 31-10-2012 11:02:06
 * @author agung.hp
 */
Bds.module.kepala_keluarga = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Kepala Keluarga',
    editTitle: 'Edit Kepala Keluarga',
    winWidth:658,
    winHeight:464,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.kepala_keluarga.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.kepala_keluarga({border: false});
        this.initGridEvents();

        /* set masterId name for master-detail grid handling */
		this.masterId = 'warga_id';
		this.displayId = 'warga_name';
		
		this.details = {
			anggota_keluarga: new Bds.module.d_warga({disabled: true})
		};
		
		this.details.anggota_keluarga.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'anggota_keluarga',
		    border: false,
		    items: [
				{itemId: 'anggota_keluarga', title: 'Anggota Keluarga', layout: 'fit', items: this.details.anggota_keluarga}
			]
		});
		this.tabPanel.on('tabchange', function(tabpanel, tab){
		    var sm = this.grid.getSelectionModel();
		    var rec = sm.getSelected();
		
		    if (rec) this.onRowSelectMasterGrid(sm, null, rec);
		}, this);
		
		this.grid.getSelectionModel().on('rowselect', this.onRowSelectMasterGrid, this);

        /* return configured layout */
		return {
		    xtype: 'panel',
		    layout: 'border',
		    border: false,
		    items : [
		        {
		            region: 'center',
		            margins: '1 1 0 1',
		            layout: 'fit',
		            minHeight: 110,
		            items: this.grid
		        },
		        {
		            region: 'south',
		            margins: '0 1 1 1',
		            cmargins: '1 1 1 1',
		            height: 200,
		            minHeight: 110,
		            split: true,
		            collapsible: true,
		            collapseMode: 'mini',
		            hideCollapseTool: true,
		            layout: 'fit',
		            items: this.tabPanel
		        }
		    ]
		};
    },
    buildForm : function(){
        this.form = new Bds.form.kepala_keluarga();
		this.initFormEvents();		
		
		return this.form;
    }
});

Ext.reg('module_kepala_keluarga', Bds.module.kepala_keluarga);