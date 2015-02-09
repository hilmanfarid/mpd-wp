/**
 * @class Bds.module.d_agr_komoditas
 * Module panel for table bds_d_agr_komoditas
 *
 * @since 13-12-2012 16:29:27
 * @author agung.hp
 */
Bds.module.d_agr_komoditas = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_agr_komoditas_addTitle,
    editTitle: Bds.properties.d_agr_komoditas_editTitle,
    winWidth:430,
    winHeight:235,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_agr_komoditas.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_agr_komoditas({border: false});
        this.initGridEvents();

        /* set masterId name for master-detail grid handling */
		this.masterId = 'd_agr_komiditas_id';
		this.displayId = 'code';
		
		this.details = {
			t_agr_komod_prod: new Bds.module.t_agr_komod_prod({disabled: true})
		};
		
		this.details.t_agr_komod_prod.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 't_agr_komod_prod',
		    border: false,
		    items: [
				{itemId: 't_agr_komod_prod', title: 'Produksi Komoditas', layout: 'fit', items: this.details.t_agr_komod_prod}
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
        this.form = new Bds.form.d_agr_komoditas();
		this.initFormEvents();
		
       		
		return this.form;
    }
});

Ext.reg('module_d_agr_komoditas', Bds.module.d_agr_komoditas);