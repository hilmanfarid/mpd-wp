/**
 * @class Bds.module.d_wisata
 * Module panel for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.module.d_wisata = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_wisata_addTitle,
    editTitle: Bds.properties.d_wisata_editTitle,
    winWidth:400,
    winHeight:405,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_wisata.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_wisata({border: false});
        this.initGridEvents();
        
        this.masterId = 'wisata_id';
		this.displayId = 'wisata_name';
		
		this.details = {
			wisata_detail: new Bds.module.t_wisata_detail({disabled: true})
		};
		
		this.details.wisata_detail.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'wisata_detail',
		    border: false,
		    items: [
				{itemId: 'wisata_detail', title: 'Detail Wisata', layout: 'fit', items: this.details.wisata_detail}
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
        

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.d_wisata();
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_d_wisata', Bds.module.d_wisata);