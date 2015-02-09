/**
 * @class Bds.module.d_pasar
 * Module panel for table bds_d_pasar
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.module.d_pasar = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_pasar_addTitle,
    editTitle: Bds.properties.d_pasar_editTitle,
    winWidth:567,
    winHeight:332,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_pasar.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_pasar({border: false});
        this.initGridEvents();

        this.masterId = 'pasar_id';
		this.displayId = 'pasar_name';
		
		this.details = {
			t_pasar_detail: new Bds.module.t_pasar_detail({disabled: true})
		};
		
		this.details.t_pasar_detail.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 't_pasar_detail',
		    border: false,
		    items: [
				{itemId: 't_pasar_detail', title: 'Detail Pasar', layout: 'fit', items: this.details.t_pasar_detail}
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
        this.form = new Bds.form.d_pasar();
		this.initFormEvents();
				
		return this.form;
    }
});

Ext.reg('module_d_pasar', Bds.module.d_pasar);