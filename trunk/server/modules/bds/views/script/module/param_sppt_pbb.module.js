/**
 * @class Bds.module.param_sppt_pbb
 * Module panel for table bds_param_sppt_pbb
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.param_sppt_pbb = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.param_sppt_pbb_addTitle,
    editTitle: Bds.properties.param_sppt_pbb_editTitle,
    winWidth:501,
    winHeight:217,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.param_sppt_pbb.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.param_sppt_pbb({border: false});
        this.initGridEvents();
        
        /* set masterId name for master-detail grid handling */
		this.masterId = 'wilayah_id';
		this.displayId = 'wilayah_nama';
		
		this.details = {
			d_sppt_pbb: new Bds.module.d_sppt_pbb({disabled: true})
		};
		
		this.details.d_sppt_pbb.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'd_sppt_pbb',
		    border: false,
		    items: [
				{itemId: 'd_sppt_pbb', title: 'SPPT PBB', layout: 'fit', items: this.details.d_sppt_pbb}
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

Ext.reg('module_param_sppt_pbb', Bds.module.param_sppt_pbb);