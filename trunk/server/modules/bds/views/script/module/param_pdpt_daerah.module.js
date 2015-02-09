/**
 * @class Bds.module.param_pdpt_daerah
 * Module panel for table bds_param_pdpt_daerah
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.param_pdpt_daerah = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.param_pdpt_daerah_addTitle,
    editTitle: Bds.properties.param_pdpt_daerah_editTitle,
    winWidth:501,
    winHeight:217,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.param_pdpt_daerah.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.param_pdpt_daerah({border: false});
        this.initGridEvents();
        
        /* set masterId name for master-detail grid handling */
		this.masterId = 'param_id';
		this.displayId = 'param_name';
		
		this.details = {
			d_pdpt_daerah: new Bds.module.d_pdpt_daerah({disabled: true})
		};
		
		this.details.d_pdpt_daerah.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'd_pdpt_daerah',
		    border: false,
		    items: [
				{itemId: 'd_pdpt_daerah', title: 'Pendapatan Daerah', layout: 'fit', items: this.details.d_pdpt_daerah}
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
        return null;
    }
});

Ext.reg('module_param_pdpt_daerah', Bds.module.param_pdpt_daerah);